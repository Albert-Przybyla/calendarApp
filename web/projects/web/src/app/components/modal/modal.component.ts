import { CommonModule } from '@angular/common';
import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewContainerRef,
  inject,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  private _resolver = inject(ComponentFactoryResolver);

  @Input() title = 'Tytuł';
  @Input() size = 'md';
  @Input() id?: number = undefined;
  @Input() data?: any = undefined;
  @Input() content: any;

  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter();

  constructor(private elementRef: ElementRef) {}

  @ViewChild('dynamicContent', { read: ViewContainerRef, static: true })
  dynamicContent: ViewContainerRef;

  ngOnInit() {
    if (this.content) {
      const factory = this._resolver.resolveComponentFactory(this.content);
      const componentRef = this.dynamicContent.createComponent(factory);
      if (componentRef.instance) {
        (<ModalComponentView>componentRef.instance).id = this.id;
        (<ModalComponentView>componentRef.instance).data = this.data;
        (<ModalComponentView>componentRef.instance).close = () => this.close();
      }
    }
  }

  protected close() {
    // this._modal.dismissAll();
    this.elementRef.nativeElement.remove();
    this.closeEvent.emit();
  }

  protected submit() {
    this.elementRef.nativeElement.remove();
    this.submitEvent.emit();
  }
}

export interface ModalComponentView {
  data?: any;
  id?: any;
  close: () => void;
}
