
import { Box, Button, Container, Grid, MultiSelect, Stack, Text, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import fetes from '../public/feteByPrenom.json';

export default function Home() {
  const [value, setValue] = useState([]);

  useEffect(() => {
    console.log(value);
    value.map((e) => console.log(fetes[e]))

  }, [value]);

  return (
    <Container size="xl">
      <Grid grow gutter={100} align='center' style={{ height: '100vh' }}>
        <Grid.Col span={5}>
          <Stack spacing={'lg'}>
            <Title
              order={1}
              variant="gradient"
              gradient={{ from: '#18534F', to: '#226D68', deg: 280 }}
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
          <Box sx={(theme) => ({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
            padding: theme.spacing.xl,
            borderRadius: theme.radius.md,
            width: '80%',
            boxShadow: "5px 2px 30px 7px" +  theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1]
          })}
          >
            <Stack>
              <MultiSelect
                value={value}
                onChange={setValue}
                data={Object.keys(fetes)}
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
              <Button color="yellow" radius="lg" size="lg">
                Valider
              </Button>
            </Stack>
          </Box>
        </Grid.Col>
      </Grid>
    </Container >
  )
}

export async function getStaticProps() {
  return {
    props: { fetes }, // will be passed to the page component as props
  }
}