import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { environment } from '../environments/environment';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { BASE_PATH } from '../../../api-client';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom(HttpClientModule),
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: BASE_PATH, useValue: environment.apiBasePath },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideRouter(routes),
  ],
};
