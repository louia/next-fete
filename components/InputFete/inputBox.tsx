import { MultiSelect, SelectItem } from "@mantine/core";
import { ReactNode, useEffect, useState } from "react";
import { Fete } from "../../pages";

interface Props {
  children?: ReactNode,
  fetes: Fete[],
  setSelectedFetes: (fete: Fete[]) => void,
}

export default function InputBox({ fetes, setSelectedFetes }: Props) {
  const [value, setValue] = useState<string[]>([]);

  useEffect(() => {
    const selectedNames = [];
    for (const id of value) {
      const find = fetes.find((fete) => fete.value === id);
      if (find) {
        selectedNames.push(find);
      }
    }
    setSelectedFetes(selectedNames);
  }, [value]);


  return (
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
      radius={'md'}
      size={"md"}
    />
  );
}
