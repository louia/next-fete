import { Card, Skeleton, Stack } from "@mantine/core";
import { useState } from "react";
import useSWR from "swr";
import { Fete } from "../../pages";
import InputBox from "./inputBox";
import ValidButton from "./ValidButton";

export default function InputLayout() {
  const [selectedFetes, setSelectedFetes] = useState<Fete[]>([])

  const fetcher = (input: RequestInfo | URL, init?: RequestInit) => fetch(input, init).then(res => res.json())
  
  const { data, error } = useSWR('/api/fete', fetcher);

  const isLoading = !error && !data;

  return (
    <Card sx={(theme) => ({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      borderRadius: theme.radius.md,
      boxShadow: theme.shadows.lg,
      overflow: 'unset',
      minHeight: '164px'
    })}
    >
      <Stack>
        {
          isLoading &&
          <>
            <Skeleton height={66} radius={'lg'}/>
            <Skeleton height={50} radius={'lg'}/>
          </>
        }
        {
          !isLoading &&
          <>
            <InputBox fetes={data} setSelectedFetes={setSelectedFetes} />
            <ValidButton selectedFetes={selectedFetes} setSelectedFetes={setSelectedFetes} />
          </>
        }
      </Stack>
    </Card>
  );
}