import { Component, OnInit } from '@angular/core';
import { baseAnimations } from '../../../base/baseAnimations';
import { CalendarComponent as Calendar } from '../../../components/calendar/calendar.component';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  standalone: true,
  imports: [Calendar],
  animations: baseAnimations,
})
export class CalendarComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
