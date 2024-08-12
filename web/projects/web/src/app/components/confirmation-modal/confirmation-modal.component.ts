import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'lib-confirmation-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirmation-modal.component.html',
})
export class ConfirmationModalComponent {
  private _modal = inject(NgbActiveModal);

  data: string;

  protected confirm() {
    this._modal.close(true);
  }

  protected reject() {
    this._modal.close(false);
  }
}
