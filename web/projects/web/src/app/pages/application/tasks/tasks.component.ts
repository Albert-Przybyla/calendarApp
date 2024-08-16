import { Component, inject, OnInit } from '@angular/core';
import { BaseDataComponent } from '../../../base/baseDataComponent';
import {
  TaskControllerClientService,
  TaskGet200ResponseItemsInner,
} from '../../../../../../api-client';
import { Observable } from 'rxjs';
import { TaskFormComponent } from '../../../forms/task-form/task-form.component';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { baseAnimations } from '../../../base/baseAnimations';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  imports: [NgbPagination],
  standalone: true,
  animations: baseAnimations,
})
export class TasksComponent extends BaseDataComponent<TaskGet200ResponseItemsInner> {
  private _taskControllerClientService = inject(TaskControllerClientService);

  getValues(): Observable<any> {
    return this._taskControllerClientService.taskGet(
      this.currentPage,
      this.pageSize,
      new Date().toString()
    );
  }

  async onBtn(id?: string, el?: any) {
    if (
      await this._modal.open(
        id ? 'Edytuj zadanie' : 'Dodaj zadanie',
        TaskFormComponent,
        id,
        el
      )
    ) {
      this.getData(1);
    }
  }

  async onDelete(id: string) {
    // if (
    //   await this._modal.openConfirmationModal(
    //     'Czy na pewno chcesz usun domyślne wydarzenie'
    //   )
    // ) {
    //   this._typicalEventControllerClientService
    //     .typicalEventIdDelete(id)
    //     .subscribe({
    //       error: (e) => this._toast.onError(e),
    //       next: (v) => this._toast.show('Pomyslnie usunięto', ''),
    //       complete: () => this.getData(1),
    //     });
    // }
  }
}
