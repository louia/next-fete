import { Button, Card, MultiSelect, SelectItem, Stack } from "@mantine/core";
import * as ics from 'ics';
import { EventAttributes } from 'ics';
import { ReactNode, useEffect, useState } from "react";
import useDownloadCalendarFile from "../hooks/useDownloadCalendarFile";
import { Fete } from "../pages";

interface Props {
  children?: ReactNode,
  fetes: Fete[]
}

export default function InputBox({ fetes }: Props) {
  const [value, setValue] = useState<string[]>([]);
  const [selectedNames, setSelectedNames] = useState<Fete[]>([]);

  useEffect(() => {
    const selectedNames = [];
    for (const id of value) {
      const find = fetes.find((fete) => fete.value === id);
      if (find) {
        selectedNames.push(find);
      }
    }
    setSelectedNames(selectedNames);
  }, [value]);

  function downloadIcs() {
    const events = [] as EventAttributes[];
    for (const fete of selectedNames) {
      const dateSplit = fete?.date?.split('/');
      if(!dateSplit) return;
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
    }
  }


  return (
    <Card sx={(theme) => ({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      borderRadius: theme.radius.md,
      boxShadow: theme.shadows.lg,
      overflow: 'unset'
    })}
    >
      <Stack>
        <MultiSelect
          value={value}
          onChange={setValue}
          data={fetes as unknown as SelectItem[]}
          label="Prénom"
          placeholder="Jean, Pierre, Lucas, Hugo"
          searchable
          nothingFound="Aucun prénom trouvé"
          limit={50}
          transitionDuration={150}
          transition="pop-top-left"
          transitionTimingFunction="ease"
          clearable
          aria-label="Prénom"
        />
        <Button color="sand.5" radius="lg" size="lg" disabled={value.length === 0} onClick={downloadIcs}>
          Valider
        </Button>
      </Stack>
    </Card>
  );
}
