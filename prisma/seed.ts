import { PrismaClient } from '@prisma/client';
import fete from '../scrapping/magicmaman/fete_magic_maman.json';

const prisma = new PrismaClient();

async function main() {
    const date = new Date().toISOString();

    await prisma.fete.deleteMany({});

    const fetes = [];
    for (const [key, value] of Object.entries(fete)) {
        for (const fete of value) {
            fetes.push({
                prenom: fete.prenom,
                fete_religieuse: false,
                genre: fete.gender,
                date: key.substring(0, 5),
            });
        }
    }
    await prisma.fete.createMany({ data: fetes });
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