import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  QueryList,
} from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../services/modal.service';

import { Observable } from 'rxjs';
import { PAGE_SIZE } from '../../constants';
import { NotificationsService } from '../services/notifications.service';

@Component({
  template: '',
})
export abstract class BaseDataComponent<T> implements OnInit {
  protected _toast = inject(NotificationsService);
  protected _modal = inject(ModalService);
  protected _router = inject(Router);

  protected currentPage: number = 1;
  protected totalPages: number = 1;

  public loading: boolean = true;
  protected pageSize: number = PAGE_SIZE;

  protected items: T[] = [];

  protected getInitData?(): Promise<void>;
  protected onAfterGetData?(): any;
  protected abstract getValues(): Observable<RESPONSE<T>> | undefined;

  async ngOnInit() {
    if (this.getInitData) {
      await this.getInitData();
    }
    this.getData(1);
  }

  protected getData(page?: number) {
    this.loading = true;
    if (page) this.currentPage = page;
    this.getValues()?.subscribe({
      next: (ans) => {
        if (ans) {
          this.items = ans.items!;
          this.totalPages = ans.maxPage!;
        }
      },
      error: (e) => this._toast.onError(e),
      complete: () => {
        if (this.onAfterGetData) {
          this.onAfterGetData();
        }
        this.loading = false;
      },
    });
  }
}

interface RESPONSE<T> {
  items?: Array<T> | null;
  pageNumber?: number;
  readonly maxPage?: number;
}
