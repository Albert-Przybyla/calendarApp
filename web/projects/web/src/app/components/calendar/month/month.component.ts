import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
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
export class MonthComponent implements OnInit {
  @Output() createEvent = new EventEmitter<Date>();

  private eventControllerClientService = inject(EventControllerClientService);

  protected start: Date;
  protected end: Date;
  protected toDay: Date = new Date();

  protected loading: boolean = true;

  ngOnInit(): void {
    this.prepareData(this.toDay);
  }

  prepareData(d: Date) {
    this.start = d.getStartOfMonth().getStartOfWeek();
    this.end = d.getEndOfMonth().getEndOfWeek();
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
