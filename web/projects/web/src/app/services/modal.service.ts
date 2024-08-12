import { Injectable, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '../components/confirmation-modal/confirmation-modal.component';
import { ModalComponent } from '../components/modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalService = inject(NgbModal);
  closeResult = '';
  header = '';

  async open(
    name: string,
    content: any,
    id?: any,
    data?: any,
    size?: string
  ): Promise<any> {
    try {
      const modalRef = await this.modalService.open(ModalComponent, {
        ariaLabelledBy: 'modal-basic-title',
        size: size ? size : 'xl',
        fullscreen: size === 'full' ? true : false,
        scrollable: false,
      });

      modalRef.componentInstance.content = content;
      modalRef.componentInstance.id = id;
      modalRef.componentInstance.data = data;
      modalRef.componentInstance.name = name;
      modalRef.componentInstance.modalRef = modalRef;

      return modalRef.result.then(
        (result) => {
          return result;
        },
        (reason) => {
          return false;
        }
      );
    } catch (error) {
      console.error('Błąd podczas otwierania modala:', error);
      return false;
    }
  }

  close(v: boolean) {
    this.modalService.dismissAll(v);
  }

  async openConfirmationModal(text: string): Promise<boolean> {
    try {
      const modalRef = await this.modalService.open(
        ConfirmationModalComponent,
        {
          ariaLabelledBy: 'modal-basic-title',
          size: 'md',
          scrollable: false,
        }
      );

      modalRef.componentInstance.data = text;

      return modalRef.result.then(
        (result) => {
          return result;
        },
        (reason) => {
          return false;
        }
      );
    } catch (error) {
      console.error('Błąd podczas otwierania modala:', error);
      return false;
    }
  }
}

export interface ModalComponentView {
  data?: any;
  id?: any;
}

export interface ModalComponentView2 {
  data?: any;
  id?: any;
  close: () => void;
}
