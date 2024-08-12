import { Component, OnInit } from '@angular/core';
import { baseAnimations } from '../../../base/baseAnimations';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  standalone: true,
  animations: baseAnimations,
})
export class CalendarComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
