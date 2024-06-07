import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PageFrom } from '../../models/pageForm.model';
import { AuthLoginPostRequest } from '../../../../../api-client';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  protected router = inject(Router);
  private _auth = inject(AuthService);

  protected form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  protected pageForm = new PageFrom(this.form);

  protected login() {
    this._auth.loginUser(
      this.form.value as AuthLoginPostRequest,
      () => this.onLogin(),
      (e: Error) => this.onError(e)
    );
  }

  private onError(e: Error) {
    console.error(e);
    // this._toast.show('Niepoprawny adres email lub hasło!', '', false);
  }

  private onLogin() {
    this.router.navigate(['/app']);
  }
}
