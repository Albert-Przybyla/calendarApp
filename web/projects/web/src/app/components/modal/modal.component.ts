import {
  Component,
  ComponentFactoryResolver,
  Input,
  ViewChild,
  ViewContainerRef,
  inject,
  OnInit,
} from '@angular/core';
import {
  ModalComponentView,
  ModalComponentView2,
} from '../../services/modal.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'lib-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnInit {
  private _modal = inject(NgbModal);
  private _resolver = inject(ComponentFactoryResolver);
  @Input() content: any;
  @Input() id: any;
  @Input() data: any;
  @Input() name: string;
  @Input() modalRef: NgbModalRef;
  @ViewChild('dynamicContent', { read: ViewContainerRef, static: true })
  dynamicContent: ViewContainerRef;

  ngOnInit() {
    if (this.content) {
      const factory = this._resolver.resolveComponentFactory(this.content);
      const componentRef = this.dynamicContent.createComponent(factory);
      if (componentRef.instance) {
        (<ModalComponentView>componentRef.instance).id = this.id;
        (<ModalComponentView>componentRef.instance).data = this.data;
        (<ModalComponentView2>componentRef.instance).close =
          this.close.bind(this);
      }
    }
  }

  close(success?: any) {
    this.modalRef.close(success);
  }
}
