import { Prisma, PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';


type PrismaFeteSelect = Prisma.feteGetPayload<{}>;
export type Fete = Pick<PrismaFeteSelect, "date" | "prenom" | "genre"> & {
  id: string
}

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Fete[]>
  ) {
    const allFetes = await prisma.fete.findMany({
      select: {
        date: true,
        fete_religieuse: false,
        id: true,
        prenom: true,
        genre: true
      },
      orderBy: {
        prenom: 'asc',
      }
    });

    const cleanedFetes = allFetes.map((fete) => ({
      ...fete,
      prenom: fete.prenom,
      id: fete.id.toString(),
      value: fete.id.toString(),
      label: fete.prenom
    }));
  

    res.status(200).json(cleanedFetes)
  }
  