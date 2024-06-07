import { Component } from '@angular/core';
import { CalendarComponent } from '../../components/calendar/calendar.component';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [CalendarComponent],
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss',
})
export class ApplicationComponent {}
