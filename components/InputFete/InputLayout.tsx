import { Card, Stack } from "@mantine/core";
import { useState } from "react";
import { Fete } from "../../pages";
import InputBox from "./inputBox";
import ValidButton from "./ValidButton";

export default function InputLayout({ fetes }: { fetes: Fete[] }) {
    const [selectedFetes, setSelectedFetes] = useState<Fete[]>([])

    return (
        <Card sx={(theme) => ({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            borderRadius: theme.radius.md,
            boxShadow: theme.shadows.lg,
            overflow: 'unset'
          })}
          >
            <Stack>
              <InputBox fetes={fetes} setSelectedFetes={setSelectedFetes}  />
              <ValidButton selectedFetes={selectedFetes} setSelectedFetes={setSelectedFetes} />
            </Stack>
          </Card>
    );
}