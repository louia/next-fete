import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import stream from 'stream';
import { promisify } from 'util';
import createCalendarEvents from '../../../utils/createCalendarEvents';

const prisma = new PrismaClient();

const pipeline = promisify(stream.pipeline);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'invalid method' });
  }

  let selectedFetesIds = req.query.ids as string[] | string;

  if (typeof selectedFetesIds === 'string') {
    selectedFetesIds = [selectedFetesIds];
  }

  if (!selectedFetesIds) return res.status(405).send({ message: 'id vide' });

  const selectedFetes = await prisma.fete.findMany({
    where: {
      id: {
        in: selectedFetesIds.map(Number)
      }
    },
    select: {
      prenom: true,
      date: true,
      genre: true
    },
    orderBy: {
      prenom: 'asc',
    }
  });

  const ics = createCalendarEvents(selectedFetes);

  if (ics) {
    res.setHeader('Content-Type', 'text/calendar');
    res.setHeader('Content-Disposition', 'attachment; filename=fete.ics');
    await pipeline(ics, res);
  }
}
