import { Button } from "@mantine/core";
import { useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Fete } from "../../pages";

interface Props {
  setSelectedFetes: (fete: Fete[]) => void,
  selectedFetes: Fete[]
}

export default function ValidButton({ selectedFetes, setSelectedFetes }: Props) {
  const [prenomsStorage, setPrenomsStorage] = useLocalStorage('prenoms', []);

  const [ids, setIds] = useState<string[] | undefined>(undefined);

  useEffect(() => {
    if (selectedFetes) {
      const ids = selectedFetes.map(fete => fete.id);
      const urlParam = new URLSearchParams(ids.map(s => ['ids', s])).toString();

      setIds(urlParam);
    }
  }, [selectedFetes])

  function clickButton(e: React.MouseEvent<HTMLElement>) {
    setPrenomsStorage(selectedFetes.map(fete => fete.id));
    console.log('ok');
    
    
  //   e.preventDefault();
  //   e.stopPropagation();
  // e.nativeEvent.stopImmediatePropagation();
  }

  const button = (
    <Button color="sand.5" radius="lg" size="lg" disabled={selectedFetes.length === 0} style={{
      width: '100%'
    }}>
      Valider
    </Button>
  );
  if (selectedFetes.length === 0) {
    return button;
  }

  return (
    <a href={`/api/fete/fete.ical?${ids}`} onClick={clickButton}>
      {button}
    </a>
  );
}