import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  @Input() title = 'Tytuł';
  @Input() size = 'md';

  @Output() closeEvent = new EventEmitter();
  @Output() submitEvent = new EventEmitter();

  constructor(private elementRef: ElementRef) {}

  protected close() {
    this.elementRef.nativeElement.remove();
    this.closeEvent.emit();
  }

  protected submit() {
    this.elementRef.nativeElement.remove();
    this.submitEvent.emit();
  }
}
