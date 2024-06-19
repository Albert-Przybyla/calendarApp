import { Component, Input, TemplateRef, inject } from '@angular/core';
import { BarComponent } from './bar/bar.component';
import { MonthComponent } from './month/month.component';
import { WeekComponent } from './week/week.component';
import { YearComponent } from './year/year.component';
import { ModalService } from '../../services/modal.service';
import { EventComponent } from '../../forms/event/event.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [BarComponent, MonthComponent, WeekComponent, YearComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  private modalService = inject(ModalService);

  test(modal: TemplateRef<any>) {
    this.modalService
      .open(modal, { title: 'cos', size: 'lg' })
      .subscribe((action) => {
        console.log(action);
      });
  }
}
