import { Component, inject, OnInit } from '@angular/core';
import { BaseModalComponent } from '../../base/baseModalComponent';
import {
  SmtpConfigIdPutRequest,
  SmtpConfigPostRequest,
  SMTPConfigurationControllerClientService,
} from '../../../../../api-client';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-smtp-configuration-form',
  templateUrl: './smtp-configuration-form.component.html',
  styleUrls: ['./smtp-configuration-form.component.scss'],
  imports: [ReactiveFormsModule],
  standalone: true,
})
export class SmtpConfigurationFormComponent extends BaseModalComponent {
  private _SMTPConfigurationControllerClientService = inject(
    SMTPConfigurationControllerClientService
  );

  protected form: FormGroup = new FormGroup({
    host: new FormControl(undefined, [Validators.required]),
    port: new FormControl(undefined, [Validators.required]),
    secure: new FormControl(undefined, [Validators.required]),
    user: new FormControl(undefined, [Validators.required]),
    password: new FormControl(undefined, [Validators.required]),
  });

  onSubmit() {
    const req = this.form.value;
    if (this.id) this.edit(req as SmtpConfigIdPutRequest);
    else this.add(req as SmtpConfigPostRequest);
  }

  private edit(req: SmtpConfigIdPutRequest) {
    this._SMTPConfigurationControllerClientService
      .smtpConfigIdPut(this.id, req)
      .subscribe({
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => {
          this.close(true);
        },
      });
  }
  private add(req: SmtpConfigPostRequest) {
    this._SMTPConfigurationControllerClientService
      .smtpConfigPost(req)
      .subscribe({
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => {
          this.close(true);
        },
      });
  }
}
