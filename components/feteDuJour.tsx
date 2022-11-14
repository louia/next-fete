import { Badge, Card, Group, Space, Text } from "@mantine/core";
import { ReactNode } from "react";
import { FeteOfTheDay } from "../pages/api/fete/day";

interface Props {
    children?: ReactNode,
    fetesOfTheDay: FeteOfTheDay[]
}

export default function FeteJour({ fetesOfTheDay }: Props) {
    const date = new Date();
    const formatedDate = new Intl.DateTimeFormat('fr-FR', {
        dateStyle: 'full'
    }).format(date);

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
                {
                    fetesOfTheDay.map((fete) => {
                        if (fete.genre === 'F') {
                            return (<Badge key={fete.id} variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}>{fete.prenom}</Badge>)
                        } else if (fete.genre === 'H') {
                            return (<Badge variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} key={fete.id}>{fete.prenom}</Badge>)
                        }
                    })
                }
            </Group>
        </Card>
    );
}