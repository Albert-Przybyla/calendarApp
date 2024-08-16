import { Component, inject } from '@angular/core';
import { baseAnimations } from '../../../base/baseAnimations';
import {
  EventByDatesPost200ResponseInner,
  TypicalEventControllerClientService,
} from '../../../../../../api-client';
import { DataDisplayerComponent } from '../../../components/data-displayer/data-displayer.component';
import { BaseDataComponent } from '../../../base/baseDataComponent';
import { Observable } from 'rxjs';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { TypicalEventFormComponent } from '../../../forms/typical-event-form/typical-event-form.component';

@Component({
  selector: 'app-typical-events',
  templateUrl: './typical-events.component.html',
  styleUrls: ['./typical-events.component.scss'],
  standalone: true,
  imports: [DataDisplayerComponent, LoaderComponent],
  animations: baseAnimations,
})
export class TypicalEventsComponent extends BaseDataComponent<EventByDatesPost200ResponseInner> {
  private _typicalEventControllerClientService = inject(
    TypicalEventControllerClientService
  );

  getValues(): Observable<any> {
    return this._typicalEventControllerClientService.typicalEventGet(
      this.currentPage,
      this.pageSize
    );
  }

  async onBtn(id?: string, el?: any) {
    if (
      await this._modal.open(
        id ? 'Edytuj domyślne wydarzenie' : 'Dodaj domyślne wydarzenie',
        TypicalEventFormComponent,
        id,
        el
      )
    ) {
      this.getData(1);
    }
  }

  async onDelete(id: string) {
    if (
      await this._modal.openConfirmationModal(
        'Czy na pewno chcesz usun domyślne wydarzenie'
      )
    ) {
      this._typicalEventControllerClientService
        .typicalEventIdDelete(id)
        .subscribe({
          error: (e) => this._toast.onError(e),
          next: (v) => this._toast.show('Pomyslnie usunięto', ''),
          complete: () => this.getData(1),
        });
    }
  }
}
