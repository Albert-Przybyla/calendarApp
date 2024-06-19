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
  private modalNotifier?: Subject<string>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) {}

  open(content: TemplateRef<any>, options?: any): Observable<string> {
    const modalFactory = this.resolver.resolveComponentFactory(ModalComponent);
    const viewRef = content.createEmbeddedView(null);
    const modalComponent = modalFactory.create(this.injector, [
      viewRef.rootNodes,
    ]);

    modalComponent.instance.size = options?.size;
    modalComponent.instance.title = options?.title;
    modalComponent.instance.closeEvent.subscribe(() => this.close());
    modalComponent.instance.submitEvent.subscribe(() => this.submit());

    modalComponent.hostView.detectChanges();
    this.document.body.appendChild(modalComponent.location.nativeElement);
    this.modalNotifier = new Subject();
    return this.modalNotifier?.asObservable();
  }

  close() {
    this.modalNotifier?.next('cancel');
    this.modalNotifier?.complete();
  }

  submit() {
    this.modalNotifier?.next('confirm');
    this.close();
  }
}
