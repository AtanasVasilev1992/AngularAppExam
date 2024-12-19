import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appUrlValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: UrlValidatorDirective,
      multi: true,
    },
  ],
})
export class UrlValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const urlPattern = /^https?:\/\/.+/i;
    if (!urlPattern.test(control.value)) {
      return { invalidUrl: true };
    }

    return null;
  }
}