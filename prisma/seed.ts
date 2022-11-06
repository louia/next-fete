import { PrismaClient } from '@prisma/client';
import fete from '../public/feteByDate.json';

const prisma = new PrismaClient();

async function main() {
    const date = new Date().toISOString();

    await prisma.fete.deleteMany({});

    const inserts = [];
    for (const [key, value] of Object.entries(fete)) {
        for (const fete of value) {
            inserts.push(prisma.fete.create({
                data: {
                    prenom: fete.pnom,
                    createdAt: date,
                    fete_religieuse: fete.majeur ? 1 : 0,
                    date: key.substring(0,5),
                }
            }));
        }
    }
    await prisma.$transaction(inserts);
}


main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })