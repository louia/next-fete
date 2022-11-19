import * as ics from 'ics';
import { EventAttributes } from "ics";
import { Fete } from '../pages';

export default function createCalendarEvents(selectedFetes: Fete[]|{
    prenom: string|null,
    date: string|null,
    genre: string|null,
}[]): string|undefined {
    const events = [] as EventAttributes[];
    for (const fete of selectedFetes) {
      const dateSplit = fete?.date?.split('/');
      if (!dateSplit) return;
      const [day, month] = dateSplit;
      const event = {
        start: [Number(new Date().getFullYear()), Number(month), Number(day)],
        end: [Number(new Date().getFullYear()), Number(month), Number(day) + 1],
        recurrenceRule: 'FREQ=YEARLY',
        title: `Fête des ${fete.prenom}`,
        description: `C'est la fête des ${fete.prenom} (${fete.genre}) ! 🎉🎊`,
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

    return value;
}