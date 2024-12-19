import { AbstractControl, ValidationErrors } from '@angular/forms';

export function urlValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null;
  }

  const urlPattern = /^https?:\/\/.+/i;
  
  if (!urlPattern.test(control.value)) {
    return { invalidUrl: true };
  }

  return null;
}