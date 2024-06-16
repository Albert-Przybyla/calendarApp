import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { EventControllerClientService } from '../../../../../../api-client';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-month',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './month.component.html',
  styleUrl: './month.component.scss',
})
export class MonthComponent implements OnChanges {
  @Input() monthYear: Date;

  private eventControllerClientService = inject(EventControllerClientService);

  protected start: Date;
  protected end: Date;
  protected toDay: Date = new Date();

  protected loading: boolean = true;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.toDay.getDay());
    this.start = this.monthYear.getStartOfMonth().getStartOfWeek();
    this.end = this.monthYear.getEndOfMonth().getEndOfWeek();
    this.getEvents();
  }

  private getCalendars() {}

  private getEvents() {
    this.eventControllerClientService
      .eventByDatesPost({
        start: this.start.toJSON(),
        end: this.end.toJSON(),
      })
      .subscribe({
        next: (v) => {
          console.log(v);
        },
        error: (e) => console.error(e),
        complete: () => (this.loading = false),
      });
  }

  protected getDates(): Date[] {
    const dates: Date[] = [];
    let currentDate = new Date(this.start);

    while (currentDate <= this.end) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }
}
