import { Stack, Text } from "@mantine/core";

export default function Subtitle() {
    return (
        <>
            <Stack spacing={'sm'}>
                <Text>
                    Inscrivez le nom des personnes que vous aimez afin de ne pas oublier leur fête.
                </Text>
                <Text>Un fichier d'événement sera téléchargé afin de l'ajouter dans votre calendrier numérique. Cela permettra de recevoir une notification la veille et le jour même pour vous rappeler de leur souhaiter leur fête.
                </Text>
            </Stack>
        </>
    );
}