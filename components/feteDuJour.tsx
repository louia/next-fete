import { Badge, Card, Group, Space, Text } from "@mantine/core";
import fetes from '../public/feteByDate.json';

export default function FeteJour() {
    const date = new Date();

    const formatedDate = new Intl.DateTimeFormat('fr-FR').format(date) as keyof typeof fetes;
    const fetesOfTheDay = fetes[formatedDate];

    return (
        <Card sx={(theme) => ({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            borderRadius: theme.radius.md,
            boxShadow: theme.shadows.lg
        })}
        >
            <Text>Aujourd'hui nous fêtons les :</Text>
            <Space h='xs' />
            <Group spacing="xs">
                {fetesOfTheDay.map((fete) =>
                    <Badge key={fete.id}>{fete.pnom}</Badge>
                )}
            </Group>
        </Card>
    );
}