import { Component, inject, OnInit } from '@angular/core';
import { baseAnimations } from '../../../base/baseAnimations';
import {
  EventByDatesPost200ResponseInner,
  TypicalEventControllerClientService,
} from '../../../../../../api-client';
import { DataDisplayerComponent } from '../../../components/data-displayer/data-displayer.component';
import { BaseDataComponent } from '../../../base/baseDataComponent';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-typical-events',
  templateUrl: './typical-events.component.html',
  styleUrls: ['./typical-events.component.scss'],
  standalone: true,
  imports: [DataDisplayerComponent],
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
}
