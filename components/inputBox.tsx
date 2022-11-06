import { Button, Card, MultiSelect, Stack } from "@mantine/core";
import { useState } from "react";

export default function InputBox({ fetes }) {
  const [value, setValue] = useState([]);

  // useEffect(() => {
  //     console.log(value);
  //     value.map((e) => console.log(fetes[e]))

  //   }, [value]);
  // console.log(fetes);


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
          // valueComponent={({ id }) => id}
          // itemComponent={({ prenom }) => prenom}
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
        />
        <Button color="sand.5" radius="lg" size="lg">
          Valider
        </Button>
      </Stack>
    </Card>
  );
}