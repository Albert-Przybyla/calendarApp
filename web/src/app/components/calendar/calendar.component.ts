import { Component, Input } from '@angular/core';
import { BarComponent } from './bar/bar.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [BarComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {}
