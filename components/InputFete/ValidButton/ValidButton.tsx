import { Button } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { Fete } from "../../../pages";
import createCalendarEvents from "../../../utils/createCalendarEvents";
import downloadCalendarFile from "../../../utils/downloadCalendarFile";

interface Props {
  setSelectedFetes: (fete: Fete[]) => void,
  selectedFetes: Fete[]
}

export default function ValidButton({ selectedFetes, setSelectedFetes }: Props) {
  const [prenomsStorage, setPrenomsStorage] = useLocalStorage<string[]>({ key: 'prenoms', defaultValue: [] });

  function downloadIcs() {
    const ics = createCalendarEvents(selectedFetes);
    if (ics) {
      downloadCalendarFile(ics, 'fete.ics');
      const ids = selectedFetes.map(fete => fete.id);
      setPrenomsStorage([...new Set(prenomsStorage.concat(ids))]);
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