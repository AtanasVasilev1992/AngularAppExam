import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator } from '@angular/forms';

// For Reactive Forms
export function emailValidator(domains: string[]) {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null;
        }

        const value = control.value.toLowerCase();
        if (!value.match(/^[^@]{3,}@[^@]{3,}$/)) {
            return { emailValidator: true };
        }

        const [_, domain] = value.split('@');
        const domainExtension = domain.split('.').pop();

        if (!domains.includes(domainExtension)) {
            return { emailValidator: true };
        }

        return null;
    };
}

// For Template-Driven Forms
@Directive({
    selector: '[appEmail][ngModel]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: EmailValidatorDirective,
            multi: true,
        },
    ],
})
export class EmailValidatorDirective implements Validator {
    @Input('appEmail') domains: string[] = [];

    validate(control: AbstractControl): ValidationErrors | null {
        if (!control.value) {
            return null;
        }

        const value = control.value.toLowerCase();
        if (!value.match(/^[^@]{3,}@[^@]{3,}$/)) {
            return { emailValidator: true };
        }

        const [_, domain] = value.split('@');
        const domainExtension = domain.split('.').pop();

        if (!this.domains.includes(domainExtension)) {
            return { emailValidator: true };
        }

        return null;
    }
}
