import { Button, Card, MultiSelect, Stack } from "@mantine/core";
import { ReactNode, useEffect, useState } from "react";
import { Fete } from "../pages";


interface Props {
  children?: ReactNode,
  fetes: Fete[]
}

export default function InputBox({ fetes }: Props) {
  const [value, setValue] = useState<Fete['value'][]>([]);

  useEffect(() => {
    for (const id of value) {
      const find = fetes.find((fete) => fete.value === id);
      console.log(id, find);
    }
  }, [value]);


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
          data={fetes}
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
        <Button color="sand.5" radius="lg" size="lg">
          Valider
        </Button>
      </Stack>
    </Card>
  );
}