import { Image, Title, useMantineColorScheme } from "@mantine/core";

export default function MaintTitle() {
    const { colorScheme } = useMantineColorScheme();

    return (
        <>
            <Title
                order={1}
                variant="gradient"
                gradient={colorScheme === 'dark' ? { from: 'sand.3', to: 'camel.5', deg: 280 } : { from: 'emeraude', to: 'emeraude-light', deg: 280 }}
            >
                N'oubliez pas de souhaiter la fête de vos proches !
                <Image
                    alt="Icone confetti"
                    width={32}
                    fit="contain"
                    src="/confetti.svg"
                    style={{
                        display: 'inline-block',
                        width: '32px',
                        marginLeft: '5%'
                    }}
                />
            </Title>
        </>
    );
}