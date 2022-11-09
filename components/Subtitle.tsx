import { Stack, Text } from "@mantine/core";

export default function Subtitle() {
    return (
        <>
            <Stack spacing={'sm'}>
                <Text>
                    Entrer les prénoms de vos proches afin de ne pas oublier leur fête.
                </Text>
                <Text>Un fichier d'événement sera alors téléchargé afin de d'ajouter dans votre calendrier numérique les fêtes de vos proches, cela permettra de recevoir une notification pour vous rappelez de leur souhaiter leur fête.
                </Text>
            </Stack>
        </>
    );
}