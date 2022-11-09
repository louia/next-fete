import { Title, useMantineColorScheme } from "@mantine/core";

export default function MaintTitle() {
    const { colorScheme } = useMantineColorScheme();

    return (
        <>
            {colorScheme === 'dark' ? (
                <Title
                    order={1}
                    variant="gradient"
                    gradient={{ from: 'sand.3', to: 'camel.5', deg: 280 }}
                >
                    N'oubliez pas de souhaiter la fête de vos proches !
                </Title>
            ) : (
                <Title
                    order={1}
                    variant="gradient"
                    gradient={{ from: 'emeraude', to: 'emeraude-light', deg: 280 }}
                >
                    N'oubliez pas de souhaiter la fête de vos proches !
                </Title>
            )}
        </>
    );
}