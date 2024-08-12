import { Component, OnInit, inject } from '@angular/core';
import { BarComponent } from './bar/bar.component';
import { MonthComponent } from './month/month.component';
import { WeekComponent } from './week/week.component';
import { YearComponent } from './year/year.component';
import { ModalService } from '../../services/modal.service';
import {
  CalendarControllerClientService,
  CalendarGet200ResponseInner,
  EventControllerClientService,
  EventGet200ResponseInner,
} from '../../../../../api-client';
import { EventFormComponent } from '../../forms/event-form/event-form.component';
import { GetEvents } from './getEvents.model';
import { EventForCalendar } from './event.model';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [BarComponent, MonthComponent, WeekComponent, YearComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit {
  private modalService = inject(ModalService);
  private eventControllerClientService = inject(EventControllerClientService);

  protected calendars: CalendarGet200ResponseInner[] = [];
  protected events: EventForCalendar[] = [];
  protected loading: boolean = true;
  protected initLoading: boolean = true;

  private calendarControllerClientService = inject(
    CalendarControllerClientService
  );

  ngOnInit(): void {
    this.getCalendars();
  }

  protected async createEvent(d?: Date) {
    if (d) d.setTimeFromDate(new Date());
    await this.modalService.open(
      'Dodaj wydarzenie',
      EventFormComponent,
      undefined,
      { date: d },
      'lg'
    );
  }

  private getCalendars() {
    this.calendarControllerClientService.calendarGet().subscribe({
      next: (v) => {
        this.calendars = v;
      },
      error: (e) => console.error(e),
      complete: () => (this.initLoading = false),
    });
  }

  protected getEvents(d: GetEvents) {
    this.eventControllerClientService
      .eventByDatesPost({
        start: d.start.toJSON(),
        end: d.end.toJSON(),
      })
      .subscribe({
        next: (v) => {
          this.events = [];
          console.log(this.calendars);
          console.log(v);
          v.forEach((x) => {
            this.events.push(
              new EventForCalendar(
                x,
                this.calendars.find((y) => y.id == x.calendarId)?.color
              )
            );
          });
          console.log(this.events);
        },
        error: (e) => console.error(e),
        complete: () => (this.loading = false),
      });
  }
}
