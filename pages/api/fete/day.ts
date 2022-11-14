import { Prisma, PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';


type PrismaFeteSelect = Prisma.feteGetPayload<{}>;
export type FeteOfTheDay = Pick<PrismaFeteSelect, "prenom" | "genre"> & {
    id: string
  }
const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<FeteOfTheDay[]>
  ) {
    const date = new Date();
    const formatedDate = new Intl.DateTimeFormat('fr-FR').format(date).substring(0, 5);
  
    const fetesOfTheDay = await prisma.fete.findMany({
      where: {
        date: formatedDate
      },
      select: {
        prenom: true,
        id: true,
        genre: true
      },
      orderBy: {
        prenom: 'asc',
      }
    });

    const cleanedFetesOfTheDay = fetesOfTheDay.map((fete) => ({
        ...fete,
        id: fete.id.toString(),
      }));
  

    res.status(200).json(cleanedFetesOfTheDay)
  }
  