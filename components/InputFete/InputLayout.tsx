import { Card, Skeleton, Stack } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useState } from "react";
import useSWR from "swr";
import useWebView from "../../hooks/useWebView";
import { Fete } from "../../pages";
import InputBox from "./inputBox";
import { default as ValidButton, default as ValidButtonWebView } from "./ValidButton/ValidButtonWebView";

export default function InputLayout() {
  const [selectedFetes, setSelectedFetes] = useState<Fete[]>([]);
  const isWebView = useWebView();
  const [prenomsStorage, setPrenomsStorage] = useLocalStorage<string[]>({ key: 'prenoms', defaultValue: [] });
  
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
      {prenomsStorage}
      <Stack>
        {
          isLoading &&
          <>
            <Skeleton height={66} radius={'lg'} />
            <Skeleton height={50} radius={'lg'} />
          </>
        }
        {
          !isLoading &&
          <>
            <InputBox fetes={data} setSelectedFetes={setSelectedFetes} />
            {
              isWebView &&
              <ValidButtonWebView selectedFetes={selectedFetes} setSelectedFetes={setSelectedFetes} />
            }
            {
              !isWebView &&
              <ValidButton selectedFetes={selectedFetes} setSelectedFetes={setSelectedFetes} />
            }
          </>
        }
      </Stack>
    </Card>
  );
}