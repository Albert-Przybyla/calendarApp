import { Component, OnInit } from '@angular/core';
import { baseAnimations } from '../../../base/baseAnimations';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  standalone: true,
  animations: baseAnimations,
})
export class AccountComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
