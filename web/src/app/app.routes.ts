import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ApplicationComponent } from './pages/application/application.component';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'app',
    component: ApplicationComponent,
    canActivate: [authGuard],
    children: [],
  },
];
