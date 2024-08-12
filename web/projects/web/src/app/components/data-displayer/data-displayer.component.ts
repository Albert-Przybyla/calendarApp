import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {
  trigger,
  transition,
  query,
  animateChild,
  animate,
  style,
} from '@angular/animations';
import { PAGE_SIZE } from '../../../constants';

@Component({
  selector: 'app-data-displayer',
  standalone: true,
  imports: [NgbModule, FormsModule, TranslateModule],
  templateUrl: './data-displayer.component.html',
  styleUrl: './data-displayer.component.scss',
  animations: [
    trigger('fadeOut', [
      transition(':leave', [
        query(':leave', animateChild(), { optional: true }),
        animate('200ms ease-in', style({ opacity: 0 })),
      ]),
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        query(':enter', animateChild(), { optional: true }),
        animate('250ms 200ms ease-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class DataDisplayerComponent {
  @Input() totalPages: number = 1;
  @Input() currentPage: number = 1;
  @Input() loading: boolean = true;
  @Input() pageSize: number = PAGE_SIZE;
  @Input() enableColapse: boolean = false;
  @Output() pageChange = new EventEmitter<number>();
}
