import { FormGroup, ValidatorFn, Validators } from '@angular/forms';

export class PageFrom {
  private form: FormGroup;

  constructor(form: FormGroup) {
    this.form = form;
  }

  public isControlValid(control: string): boolean {
    if (this.form.get(control)?.touched) {
      return this.form.get(control)?.valid!;
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
