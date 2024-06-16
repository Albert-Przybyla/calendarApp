import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalednarType } from '../../../models/calendarType.enum';
import { EnumTranslationPipe } from '../../../pipes/enum-translate.pipe';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [FormsModule, EnumTranslationPipe, TranslateModule, CommonModule],
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.scss',
})
export class BarComponent {
  @Output() dateChange = new EventEmitter<Date>();
  @Output() typeChange = new EventEmitter<CalednarType>();

  protected date: Date = new Date();
  protected type: CalednarType = CalednarType.Month;
  protected calednarTypes = CalednarType;

  protected updateDate(event: any) {
    const value = (event.target as HTMLInputElement).value;
    switch (this.type) {
      case CalednarType.Day:
        this.date = new Date(value);
        break;
      case CalednarType.Week:
        this.date = this.getDateFromWeekAndDay(
          +value.substring(0, 4),
          +value.substring(6),
          this.date.getDay()
        );
        break;
      case CalednarType.Month:
        this.date.setMonth(+value.substring(5));
        break;
      case CalednarType.Year:
        this.date.setFullYear(+value);
        break;
    }
    this.dateChange.emit(this.date);
  }

  protected incrementDate(offset: number) {
    switch (this.type) {
      case CalednarType.Day:
        this.date.setDate(this.date.getDate() + offset);
        break;
      case CalednarType.Week:
        this.date.setDate(this.date.getDate() + offset * 7);
        break;
      case CalednarType.Month:
        this.date.setMonth(this.date.getMonth() + offset);
        break;
      case CalednarType.Year:
        this.date.setFullYear(this.date.getFullYear() + offset);
        break;
    }
    this.dateChange.emit(this.date);
  }

  protected updateType(event: number) {
    this.type = event;
    this.typeChange.emit(this.type);
  }

  protected getInputType() {
    switch (this.type) {
      case CalednarType.Day:
        return 'date';
      case CalednarType.Week:
        return 'week';
      case CalednarType.Month:
        return 'month';
      case CalednarType.Year:
        return 'number';
    }
  }

  protected getInputValue() {
    switch (this.type) {
      case CalednarType.Day:
        return this.date.toISOString().slice(0, 10);
      case CalednarType.Week:
        return `${this.date.getFullYear()}-W${this.formatNumber(
          this.date.getWeek()
        )}`;
      case CalednarType.Month:
        return this.date.toISOString().slice(0, 7);
      case CalednarType.Year:
        return this.date.getFullYear();
    }
  }

  private getDateFromWeekAndDay(
    year: number,
    week: number,
    dayOfWeek: number
  ): Date {
    const januaryFirst = new Date(year, 0, 1);
    const daysToAdd = week * 7 + (dayOfWeek - januaryFirst.getDay());
    return new Date(year, 0, 1 + daysToAdd);
  }

  private formatNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
}
