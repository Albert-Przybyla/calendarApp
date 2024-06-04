import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PageFrom } from '../../models/pageForm.model';
import {
  AuthControllerClientService,
  AuthRegisterPostRequest,
} from '../../../../api-client';
import { passwordsMatchValidator } from '../../validators/ passwordsMatchValidator';
import { passwordStrengthValidator } from '../../validators/passwordStrengthValidator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private _auth = inject(AuthControllerClientService);
  protected router = inject(Router);

  protected form: FormGroup = new FormGroup(
    {
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        passwordStrengthValidator(),
      ]),
      passwordConfirmation: new FormControl('', [Validators.required]),
    },
    { validators: passwordsMatchValidator() }
  );
  protected pageForm = new PageFrom(this.form);

  protected register() {
    if (!this.pageForm.isFormValid()) {
      this.form.markAsTouched();
      return;
    }

    this._auth
      .authRegisterPost(this.form.value as AuthRegisterPostRequest)
      .subscribe({
        next: (v) => this.router.navigate(['/login']),
        error: (e) => {
          console.log(e);
        },
      });
  }
}
