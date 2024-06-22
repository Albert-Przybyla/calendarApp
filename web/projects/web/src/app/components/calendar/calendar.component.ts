import { Component, inject } from '@angular/core';
import { BarComponent } from './bar/bar.component';
import { MonthComponent } from './month/month.component';
import { WeekComponent } from './week/week.component';
import { YearComponent } from './year/year.component';
import { ModalService } from '../../services/modal.service';
import { EventControllerClientService } from '../../../../../api-client';
import { EventFormComponent } from '../../forms/event-form/event-form.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [BarComponent, MonthComponent, WeekComponent, YearComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  private modalService = inject(ModalService);
  private eventControllerClientService = inject(EventControllerClientService);

  protected createEvent(d?: Date) {
    if (d) d.setTimeFromDate(new Date());
    this.modalService
      .open(EventFormComponent, { date: d }, { title: 'cos', size: 'lg' })
      .subscribe((action) => {
        console.log(action);
      });
  }
}
