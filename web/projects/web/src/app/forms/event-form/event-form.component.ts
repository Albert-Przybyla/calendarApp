import { Component, Input, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  EventControllerClientService,
  EventPostRequest,
} from '../../../../../api-client';
import { BaseModalComponent } from '../../base/baseModalComponent';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
})
export class EventFormComponent extends BaseModalComponent {
  private eventControllerClientService = inject(EventControllerClientService);

  protected form: FormGroup = new FormGroup({
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

  protected override onParamsSet(): void {
    if (this.data && this.data['date']) {
      const d: Date = this.data['date'];
      this.form.patchValue({
        start: d.toISOString().split('T')[0],
        startTime: d.getTimeString(),
        end: d.toISOString().split('T')[0],
        endTime: d.addHours(1).getTimeString(),
      });
    }
  }

  onSubmit() {
    const req = this.form.value;
    req.start = `${req.start}T${req.startTime}`;
    req.end = `${req.end}T${req.endTime}`;
    this.eventControllerClientService
      .eventPost(req as EventPostRequest)
      .subscribe({
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => {
          this.close();
        },
      });
  }
}
