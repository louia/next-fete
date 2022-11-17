
import { Center, Grid, MediaQuery, Space, Stack } from '@mantine/core';
import { Prisma, PrismaClient } from '@prisma/client';
import { ReactNode } from 'react';
import FeteJour from '../components/feteDuJour';
import InputLayout from '../components/InputFete/InputLayout';
import MaintTitle from '../components/MainTitle';
import Subtitle from '../components/Subtitle';

type PrismaFeteSelect = Prisma.feteGetPayload<{}>;
export type Fete = Pick<PrismaFeteSelect, "date" | "prenom" | "genre"> & {
  id: string;
  value: string,
  label: PrismaFeteSelect['prenom'],
  group?: string 
}

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  const date = new Date();
  const formatedDate = new Intl.DateTimeFormat('fr-FR').format(date).substring(0, 5);

  const fetesOfTheDay = await prisma.fete.findMany({
    where: {
      date: formatedDate
    },
    select: {
      prenom: true,
      id: true,
      genre: true
    },
    orderBy: {
      prenom: 'asc',
    }
  });
  const cleanedFetesOfTheDay = fetesOfTheDay.map((fete) => ({
    ...fete,
    id: fete.id.toString(),
  }));

  return { props: { cleanedFetesOfTheDay } }
}

interface Props {
  children?: ReactNode,
  cleanedFetesOfTheDay: Fete[],
}

export default function Home({ cleanedFetesOfTheDay, ...props }: Props) {
  return (
    <MediaQuery
      query="(max-width: 730px)"
      styles={{ paddingTop: '20vw !important' }}
    >
      <Center style={{ zIndex: 2, padding: '0 3%' }}>
        <Grid justify={'space-between'} align={'center'} grow>
          <Grid.Col span={5}>
            <Stack spacing={'lg'}>
              <MaintTitle />
              <Subtitle />
            </Stack>
          </Grid.Col>
          <Grid.Col span={7}>
            <InputLayout />
            <Space h='md' />
            <FeteJour fetesOfTheDay={cleanedFetesOfTheDay} />
          </Grid.Col>
        </Grid>
      </Center>
    </MediaQuery>
  )
}