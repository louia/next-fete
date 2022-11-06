import { Badge, Card, Group, Space, Text } from "@mantine/core";

export default function FeteJour({fetesOfTheDay}) {
    const date = new Date();
    const formatedDate = new Intl.DateTimeFormat('fr-FR').format(date);

    return (
        <Card sx={(theme) => ({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            borderRadius: theme.radius.md,
            boxShadow: theme.shadows.lg
        })}
        >
            <Text>Aujourd'hui nous sommes le {formatedDate} et nous fêtons les :</Text>
            <Space h='xs' />
            <Group spacing="xs">
                {fetesOfTheDay.map((fete) =>
                    <Badge key={fete.id}>{fete.prenom}</Badge>
                )}
            </Group>
        </Card>
    );
}