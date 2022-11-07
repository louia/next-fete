import { PrismaClient } from '@prisma/client';
import fete from '../scrapping/magicmaman/fete_magic_maman.json';

const prisma = new PrismaClient();

async function main() {
    const date = new Date().toISOString();

    await prisma.fete.deleteMany({});

    const inserts = [];
    for (const [key, value] of Object.entries(fete)) {
        for (const fete of value) {
            inserts.push(prisma.fete.create({
                data: {
                    prenom: fete.prenom,
                    createdAt: date,
                    fete_religieuse: 0,
                    genre: fete.gender,
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