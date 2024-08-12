import { Component, OnInit } from '@angular/core';
import { baseAnimations } from '../../../base/baseAnimations';

@Component({
  selector: 'app-typical-events',
  templateUrl: './typical-events.component.html',
  styleUrls: ['./typical-events.component.scss'],
  standalone: true,
  animations: baseAnimations,
})
export class TypicalEventsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
