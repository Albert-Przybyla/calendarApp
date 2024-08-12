import { Component, OnInit } from '@angular/core';
import { baseAnimations } from '../../../base/baseAnimations';
import { CalendarComponent as Calendar } from '../../../components/calendar/calendar.component';
import { LoaderComponent } from '../../../components/loader/loader.component';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  standalone: true,
  imports: [Calendar, LoaderComponent],
  animations: baseAnimations,
})
export class CalendarComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
