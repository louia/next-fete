
import { Container, Grid, Space, Stack, Text, Title } from '@mantine/core';
import FeteJour from '../components/feteDuJour';
import InputBox from '../components/inputBox';
import fetes from '../public/feteByPrenom.json';

export default function Home() {
  return (
    <Container size="xl">
      <Grid grow gutter={100} align='center' style={{ height: '100vh' }}>
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
          <InputBox />
          <Space h='md' />
          <FeteJour />
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