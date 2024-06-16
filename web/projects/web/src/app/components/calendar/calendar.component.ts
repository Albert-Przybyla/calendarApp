import { Component, Input } from '@angular/core';
import { BarComponent } from './bar/bar.component';
import { MonthComponent } from './month/month.component';
import { WeekComponent } from './week/week.component';
import { YearComponent } from './year/year.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [BarComponent, MonthComponent, WeekComponent, YearComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  protected date: Date = new Date();
}
