import { Component, inject, OnInit } from '@angular/core';
import { baseAnimations } from '../../../base/baseAnimations';
import {
  SmtpConfigGet200Response,
  SMTPConfigurationControllerClientService,
} from '../../../../../../api-client';
import { ModalService } from '../../../services/modal.service';
import { SmtpConfigurationFormComponent } from '../../../forms/smtp-configuration-form/smtp-configuration-form.component';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  standalone: true,
  animations: baseAnimations,
  imports: [LoaderComponent],
})
export class AccountComponent implements OnInit {
  private _SMTPConfigurationControllerClientService = inject(
    SMTPConfigurationControllerClientService
  );
  protected _auth = inject(AuthService);

  private _modal = inject(ModalService);

  loading: boolean = true;
  smtpConfig?: SmtpConfigGet200Response = undefined;

  ngOnInit() {
    this.getSMTPConfiguration();
  }

  getSMTPConfiguration() {
    this._SMTPConfigurationControllerClientService.smtpConfigGet().subscribe({
      next: (v) => {
        this.smtpConfig = v;
        console.log(v);
      },
      error: (e) => {
        this.loading = false;
      },
      complete: () => (this.loading = false),
    });
  }

  async openSmtpConfigModal() {
    if (
      await this._modal.open(
        this.smtpConfig
          ? 'Edytuj Konfiguracje SMTP'
          : 'Dodaj Konfiguracje SMTP',
        SmtpConfigurationFormComponent,
        this.smtpConfig?.id
      )
    ) {
      this.getSMTPConfiguration();
    }
  }
}
