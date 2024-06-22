import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventForCalendar } from '../event.model';
import { GetEvents } from '../getEvents.model';

@Component({
  selector: 'app-month',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './month.component.html',
  styleUrl: './month.component.scss',
})
export class MonthComponent implements OnInit {
  @Output() createEvent = new EventEmitter<Date>();
  @Output() getEvents = new EventEmitter<GetEvents>();

  @Input() events: EventForCalendar[] = [];

  protected start: Date;
  protected end: Date;
  protected toDay: Date = new Date();

  ngOnInit(): void {
    this.prepareData(this.toDay);
  }

  prepareData(d: Date) {
    this.start = d.getStartOfMonth().getStartOfWeek();
    this.end = d.getEndOfMonth().getEndOfWeek();
    this.getEvents.next({ start: this.start, end: this.end });
  }

  protected getEventsForDay(d: Date) {
    return this.events.filter(
      (x) =>
        new Date(x.end!).compareTo(d) >= 0 &&
        new Date(x.start!).compareTo(d) <= 0
    );
  }

  protected getEventsGroupedByCalendar(d: Date): Group[] | undefined {
    const ev = this.getEventsForDay(d);
    if (!ev.length) return undefined;
    const groups: Group[] = [];
    ev.forEach((x) => {
      const g = groups.find((y) => y.id === x.calendarId);
      if (g) {
        g.events.push(x);
      } else {
        groups.push(new Group(x));
      }
    });
    console.log(groups);
    return groups;
  }

  protected getDates(): Date[] {
    const dates: Date[] = [];
    let currentDate = new Date(this.start);

    while (currentDate <= this.end) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }
}

class Group {
  id: string;
  color: string;
  events: EventForCalendar[];

  constructor(event: EventForCalendar) {
    this.id = event.calendarId;
    this.color = event.calendarColor!;
    this.events = [event];
  }
}
