import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  Injectable,
  Injector,
  TemplateRef,
} from '@angular/core';
import { ModalComponent } from '../components/modal/modal.component';
import { DOCUMENT } from '@angular/common';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalNotifier?: Subject<ModalResponse>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) {}

  open(content: any, data?: any, options?: any): Observable<ModalResponse> {
    const modalFactory = this.resolver.resolveComponentFactory(ModalComponent);
    const modalComponent = modalFactory.create(this.injector);

    modalComponent.instance.size = options?.size;
    modalComponent.instance.title = options?.title;
    modalComponent.instance.data = data;
    modalComponent.instance.content = content;
    modalComponent.instance.closeEvent.subscribe(() => this.close());
    modalComponent.instance.submitEvent.subscribe(() => this.submit());

    modalComponent.hostView.detectChanges();
    this.document.body.appendChild(modalComponent.location.nativeElement);
    this.modalNotifier = new Subject();
    return this.modalNotifier?.asObservable();
  }

  close() {
    this.modalNotifier?.next(ModalResponse.cancel);
    this.modalNotifier?.complete();
  }

  submit() {
    this.modalNotifier?.next(ModalResponse.confirm);
    this.close();
  }
}

export enum ModalResponse {
  cancel = 0,
  confirm = 1,
}
