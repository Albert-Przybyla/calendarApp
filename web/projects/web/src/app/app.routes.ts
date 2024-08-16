import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ApplicationComponent } from './pages/application/application.component';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './pages/register/register.component';
import { TypicalEventsComponent } from './pages/application/typical-events/typical-events.component';
import { AccountComponent } from './pages/application/account/account.component';
import { CalendarComponent } from './pages/application/calendar/calendar.component';
import { TasksComponent } from './pages/application/tasks/tasks.component';

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
    children: [
      {
        path: '',
        redirectTo: 'calendar',
        pathMatch: 'full',
      },
      {
        path: 'calendar',
        data: {
          label: 'Kalendarz',
          icon: 'bi-calendar-event',
        },
        children: [
          {
            path: '',
            component: CalendarComponent,
          },
        ],
      },
      {
        path: 'tasks',
        data: {
          label: 'Zadania',
          icon: 'bi-list-check',
        },
        children: [
          {
            path: '',
            component: TasksComponent,
          },
        ],
      },
      {
        path: 'typical-events',
        data: {
          label: 'Typowe wydarzenia',
          icon: 'bi-star-fill',
        },
        children: [
          {
            path: '',
            component: TypicalEventsComponent,
          },
        ],
      },
      {
        path: 'account',
        data: {
          label: 'Konto',
          icon: 'bi-person-circle',
        },
        children: [
          {
            path: '',
            component: AccountComponent,
          },
        ],
      },
    ],
  },
];

export function getRoutesForApp(): Routes {
  return routes.find((x) => x.path == 'app')!.children!.filter((x) => x.data);
}
