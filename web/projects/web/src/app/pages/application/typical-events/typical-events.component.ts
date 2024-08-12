import { Component, inject, OnInit } from '@angular/core';
import { baseAnimations } from '../../../base/baseAnimations';
import {
  TypicalEventControllerClientService,
  TypicalEventGet200ResponseInner,
} from '../../../../../../api-client';
import { DataDisplayerComponent } from '../../../components/data-displayer/data-displayer.component';

@Component({
  selector: 'app-typical-events',
  templateUrl: './typical-events.component.html',
  styleUrls: ['./typical-events.component.scss'],
  standalone: true,
  imports: [DataDisplayerComponent],
  animations: baseAnimations,
})
export class TypicalEventsComponent implements OnInit {
  protected loading: boolean = true;
  private _typicalEventControllerClientService = inject(
    TypicalEventControllerClientService
  );

  protected data: TypicalEventGet200ResponseInner[] = [];

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this._typicalEventControllerClientService.typicalEventGet().subscribe({
      next: (v) => {
        this.data = v;
      },
      complete: () => (this.loading = false),
    });
  }
}
