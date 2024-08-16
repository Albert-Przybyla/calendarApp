import {
  Component,
  Directive,
  inject,
  Injectable,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { ModalComponentView } from '../services/modal.service';
import { NotificationsService } from '../services/notifications.service';

@Component({ template: `` })
export abstract class BaseModalComponent
  implements ModalComponentView, OnChanges, OnInit
{
  @Input() public id: any;
  @Input() public data: any;
  @Input() public disabled: boolean = false;

  close = (res?: any) => {};
  protected _toast = inject(NotificationsService);
  protected _fb = inject(FormBuilder);
  protected loading: boolean = true;
  protected formInEditMode: boolean = false;

  protected abstract form: FormGroup;

  protected onParamsSet?(): any;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.id) this.formInEditMode = true;
    if (this.data) this.form.patchValue(this.data);
    if (this.onParamsSet) this.onParamsSet();
  }

  ngOnInit(): void {
    if (this.id) this.formInEditMode = true;
    if (this.data) this.form.patchValue(this.data);
    if (this.onParamsSet) this.onParamsSet();
  }

  public isControlValid(control: string): boolean {
    if (this.form.get(control)?.touched && this.form.get(control)) {
      return this.form.get(control)!.valid || this.form.get(control)!.disabled;
    }
    return true;
  }

  public isControlValidWithForm(
    form: AbstractControl<any, any>,
    control: string
  ): boolean {
    if (form.get(control)?.touched && form.get(control)) {
      return form.get(control)!.valid || form.get(control)!.disabled;
    }
    return true;
  }

  public isFormValid(): boolean {
    return this.form.valid;
  }

  public updateValidators(
    name: string,
    validators?: ValidatorFn | ValidatorFn[] | null,
    disabled?: boolean
  ): void {
    const nameControl = this.form.get(name);
    if (nameControl) {
      if (validators !== undefined) {
        nameControl.setValidators(validators);
        nameControl.updateValueAndValidity();
      }
      if (disabled !== undefined) {
        if (disabled) {
          nameControl.disable();
        } else {
          nameControl.enable();
        }
      }
    }
  }
}
