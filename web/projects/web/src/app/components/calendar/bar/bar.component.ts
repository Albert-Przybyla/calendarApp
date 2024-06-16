import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalednarType } from '../../../models/calendarType.enum';

@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.scss',
})
export class BarComponent {
  @Output() dateChange = new EventEmitter<Date>();
  @Output() typeChange = new EventEmitter<CalednarType>();

  protected date: Date = new Date();
  protected type: CalednarType = CalednarType.Month;
  protected calednarType = CalednarType;

  protected updateDate(event: any) {
    this.date = new Date(event);
    this.dateChange.emit(this.date);
  }
}
