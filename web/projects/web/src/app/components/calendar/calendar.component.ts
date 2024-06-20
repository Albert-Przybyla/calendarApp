import { Component, Input, OnInit, TemplateRef, inject } from '@angular/core';
import { BarComponent } from './bar/bar.component';
import { MonthComponent } from './month/month.component';
import { WeekComponent } from './week/week.component';
import { YearComponent } from './year/year.component';
import { ModalService } from '../../services/modal.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EventControllerClientService } from '../../../../../api-client';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    BarComponent,
    MonthComponent,
    WeekComponent,
    YearComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit {
  private modalService = inject(ModalService);
  private eventControllerClientService = inject(EventControllerClientService);
  private fb = inject(FormBuilder);

  test(modal: TemplateRef<any>) {
    this.modalService
      .open(modal, { title: 'cos', size: 'lg' })
      .subscribe((action) => {
        console.log(action);
      });
  }

  protected form: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      name: new FormControl(undefined, [Validators.required]),
      description: new FormControl(undefined),
      start: new FormControl(undefined, [Validators.required]),
      startTime: new FormControl(undefined, [Validators.required]),
      end: new FormControl(undefined, [Validators.required]),
      endTime: new FormControl(undefined, [Validators.required]),
      calendarId: new FormControl('665e028f8845397281847c40', [
        Validators.required,
      ]),
    });
  }

  onSubmit() {
    console.log(this.form.value);
    // this.eventControllerClientService.eventPost(this.form.value).subscribe({
    //   next: (v) => console.log(v),
    //   error: (e) => console.error(e),
    // });
  }
}
