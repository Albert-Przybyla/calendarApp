import { EventGet200ResponseInner } from '../../../../../api-client';

export class EventForCalendar {
  id: string;
  calendarId: string;
  name: string;
  description: string;
  start: Date;
  end: Date;
  calendarColor?: string;

  constructor(e: EventGet200ResponseInner, calendarColor?: string) {
    this.id = e.id!;
    this.calendarId = e.calendarId!;
    this.name = e.name!;
    this.description = e.description!;
    this.start = new Date(e.start!);
    this.end = new Date(e.end!);
    this.calendarColor = calendarColor;
  }
}
