import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (!/[A-Z]/.test(value)) {
      return { uppercaseRequired: true };
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
      return { specialCharacterRequired: true };
    }
    return null;
  };
}
