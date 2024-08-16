import { Component, inject, OnInit } from '@angular/core';
import { BaseModalComponent } from '../../base/baseModalComponent';
import {
  TypicalEventControllerClientService,
  TypicalEventPostRequest,
} from '../../../../../api-client';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-typical-event-form',
  templateUrl: './typical-event-form.component.html',
  styleUrls: ['./typical-event-form.component.scss'],
  imports: [ReactiveFormsModule],
  standalone: true,
})
export class TypicalEventFormComponent extends BaseModalComponent {
  private _typicalEventControllerClientService = inject(
    TypicalEventControllerClientService
  );

  protected form: FormGroup = new FormGroup({
    name: new FormControl(undefined, [Validators.required]),
    description: new FormControl(undefined),
    duration: new FormControl(undefined, [Validators.required]),
    calendarId: new FormControl('665e028f8845397281847c40', [
      Validators.required,
    ]),
  });

  onSubmit() {
    const req = this.form.value;
    if (this.id) this.edit(req as TypicalEventPostRequest);
    else this.add(req as TypicalEventPostRequest);
  }

  private edit(req: TypicalEventPostRequest) {
    this._typicalEventControllerClientService
      .typicalEventIdPut(this.id, req)
      .subscribe({
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => {
          this.close(true);
        },
      });
  }
  private add(req: TypicalEventPostRequest) {
    this._typicalEventControllerClientService.typicalEventPost(req).subscribe({
      next: (v) => console.log(v),
      error: (e) => console.error(e),
      complete: () => {
        this.close(true);
      },
    });
  }
}
