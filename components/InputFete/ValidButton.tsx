import { Button } from "@mantine/core";
import * as ics from 'ics';
import { EventAttributes } from "ics";
import { useEffect, useState } from "react";
import useDownloadCalendarFile from "../../hooks/useDownloadCalendarFile";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Fete } from "../../pages";

interface Props {
  setSelectedFetes: (fete: Fete[]) => void,
  selectedFetes: Fete[]
}

export default function ValidButton({ selectedFetes, setSelectedFetes }: Props) {
  const [prenomsStorage, setPrenomsStorage] = useLocalStorage('prenoms', []);
  const [isIframe, setIsIframe] = useState<boolean>(false);
  function isInWebView() {
    var userAgent = window.navigator.userAgent.toLowerCase(),
      safari = /safari/.test(userAgent),
      ios = /iphone|ipod|ipad/.test(userAgent);

    if (ios) {
      return !safari;
    }

    return userAgent.includes('wv');
  }

  useEffect(() => {
    if (isInWebView()) {
      setIsIframe(true);
    }
  }, [])


  function downloadIcs() {
    const events = [] as EventAttributes[];
    for (const fete of selectedFetes) {
      const dateSplit = fete?.date?.split('/');
      if (!dateSplit) return;
      const [day, month] = dateSplit;
      const event = {
        start: [Number(new Date().getFullYear()), Number(month), Number(day)],
        end: [Number(new Date().getFullYear()), Number(month), Number(day) + 1],
        recurrenceRule: 'FREQ=YEARLY',
        title: `Fête de ${fete.prenom}`,
        // url: fete.lien,
        description: `C'est la fête des ${fete.prenom} ! Pour plus d'informations, consultez ce lien : ${''}`,
        categories: ['fete'],
        alarms: [{
          action: 'display',
          description: 'Reminder',
          trigger: {
            hours: 5,
            minutes: 30,
            before: true,
          },
        }],
      } as EventAttributes;
      events.push(event);
    }
    const { error, value } = ics.createEvents(events);
    if (error) {
      console.error(error);
      return;
    }
    if (value) {
      useDownloadCalendarFile(value, 'fete.ics');
      setPrenomsStorage(selectedFetes.map(fete => fete.id))
    }
  }

  return (
    <>
      <Button color="sand.5" radius="lg" size="lg" disabled={selectedFetes.length === 0} onClick={downloadIcs}>
        Valider
      </Button>
    </>
  );
}