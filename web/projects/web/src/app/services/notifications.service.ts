import { Injectable } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import {
  ALERT_SHOW_DURATION,
  ERROR_ALERT_SHOW_DURATION,
} from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  toasts: ToastInfo[] = [];

  show(header: string, body: string, successful?: boolean) {
    this.toasts.push({
      header,
      body,
      successful: !!successful,
      delay: successful ? ALERT_SHOW_DURATION : ERROR_ALERT_SHOW_DURATION,
    });
  }

  remove(toast: ToastInfo) {
    this.toasts = this.toasts.filter((t) => t != toast);
  }

  onError(e: HttpErrorResponse) {
    console.error('error: ', e);
    this.show(`Błąd ${e.status}`, this.textTruncate(e.error.detail), false);
    // 'Jeżeli problem się powtarza skontaktuj się z działem technicznym',
  }

  private textTruncate(t: string) {
    if (t.length > 102) return t.slice(0, 100) + '...';
    return t;
  }
}

export interface ToastInfo {
  header: string;
  body: string;
  successful: boolean;
  delay?: number;
}
