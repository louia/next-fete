import { PrismaClient } from '@prisma/client';
import * as ics from 'ics';
import { EventAttributes } from 'ics';
import type { NextApiRequest, NextApiResponse } from 'next';
import stream from 'stream';
import { promisify } from 'util';

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
  console.log(selectedFetesIds);

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

  const events = [] as EventAttributes[];
  for (const fete of selectedFetes) {
    const dateSplit = fete?.date?.split('/');
    if (!dateSplit) return;
    const [day, month] = dateSplit;
    const event = {
      start: [Number(new Date().getFullYear()), Number(month), Number(day)],
      end: [Number(new Date().getFullYear()), Number(month), Number(day) + 1],
      recurrenceRule: 'FREQ=YEARLY',
      title: `Fête de ${fete.prenom}`,
      // url: fete.lien,
      description: `C'est la fête des ${fete.prenom} ! Pour plus d'informations, consultez ce lien : ${''}`,
      categories: ['fete'],
      alarms: [{
        action: 'display',
        description: 'Reminder',
        trigger: {
          hours: 5,
          minutes: 30,
          before: true,
        },
      }],
    } as EventAttributes;
    events.push(event);
  }
  const { error, value } = ics.createEvents(events);
  if (error) {
    console.error(error);
    return;
  }
  if (value) {
    res.setHeader('Content-Type', 'text/calendar');
    res.setHeader('Content-Disposition', 'attachment; filename=fete.ics');
    await pipeline(value, res);
  }
}
