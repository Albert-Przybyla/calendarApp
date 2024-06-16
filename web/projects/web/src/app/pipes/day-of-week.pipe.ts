import { Pipe, PipeTransform } from '@angular/core';
import { DayOfWeek } from '../models/dayOfWeek.model';

@Pipe({ name: 'dayOfWeek', standalone: true })
export class DayOfWeekPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case DayOfWeek.Monday:
        return 'poniedziałek';
      case DayOfWeek.Tuesday:
        return 'wtorek';
      case DayOfWeek.Wednesday:
        return 'środa';
      case DayOfWeek.Thursday:
        return 'czwartek';
      case DayOfWeek.Friday:
        return 'piątek';
      case DayOfWeek.Saturday:
        return 'sobota';
      case DayOfWeek.Sunday:
        return 'niedziela';
      default:
        return '';
    }
  }
}
