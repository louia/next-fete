
import { Center, Grid, MediaQuery, Space, Stack, Text, Title } from '@mantine/core';
import { Prisma, PrismaClient } from '@prisma/client';
import { ReactNode } from 'react';
import FeteJour from '../components/feteDuJour';
import InputBox from '../components/inputBox';

export type Fete = Pick<Prisma.feteSelect, "date" | "id" | "prenom"> & {
  value: Prisma.feteSelect['id'],
  label: Prisma.feteSelect['prenom'],
  fete_religieuse: number
}

export async function getServerSideProps() {
  const prisma = new PrismaClient();

  const allFetes = await prisma.fete.findMany({
    select: {
      date: true,
      fete_religieuse: true,
      id: true,
      prenom: true
    },
    orderBy: {
      prenom: 'asc',
    }
  });
  const cleanedFetes = allFetes.map((fete) => ({
    ...fete,
    fete_religieuse: fete.fete_religieuse?.toNumber(),
    value: fete.id,
    label: fete.prenom,
  }));

  const date = new Date();
  const formatedDate = new Intl.DateTimeFormat('fr-FR').format(date).substring(0, 5);

  const fetesOfTheDay = await prisma.fete.findMany({
    where: {
      date: formatedDate
    },
    select: {
      prenom: true,
      fete_religieuse: true,
      id: true
    },
    orderBy: {
      prenom: 'asc',
    }
  });
  const cleanedFetesOfTheDay = fetesOfTheDay.map((fete) => ({
    ...fete,
    fete_religieuse: fete.fete_religieuse?.toNumber(),
  }));

  return { props: { cleanedFetes, cleanedFetesOfTheDay } }
}

interface Props {
  children?: ReactNode,
  cleanedFetes: Fete[]
}

export default function Home({ cleanedFetes, cleanedFetesOfTheDay, ...props }: Props) {
  return (
    <MediaQuery
      query="(max-width: 730px)"
      styles={{ paddingTop: '20vw !important' }}
    >
      <Center style={{ zIndex: 2, padding: '0 3%' }}>
        <Grid justify={'space-between'} align={'center'} grow>
          <Grid.Col span={5}>
            <Stack spacing={'lg'}>
              <Title
                order={1}
                variant="gradient"
                gradient={{ from: 'emeraude', to: 'emeraude-light', deg: 280 }}
              >
                N'oubliez pas de souhaiter la fête de vos proches !
              </Title>
              <Stack spacing={'sm'}>
                <Text>
                  Entrer les prénoms de vos proches afin de ne pas oublier leur fête.
                </Text>
                <Text>Un fichier d'événement sera alors téléchargé afin de d'ajouter dans votre calendrier numérique les fêtes de vos proches, cela permettra de recevoir une notification pour vous rappelez de leur souhaiter leur fête.
                </Text>
              </Stack>
            </Stack>
          </Grid.Col>
          <Grid.Col span={7}>
            <InputBox fetes={cleanedFetes} />
            <Space h='md' />
            <FeteJour fetesOfTheDay={cleanedFetesOfTheDay} />
          </Grid.Col>
        </Grid>
      </Center>
    </MediaQuery>
  )
}