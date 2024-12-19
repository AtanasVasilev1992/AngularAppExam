import { ValidatorFn } from '@angular/forms';

export function matchPasswordsValidator(
    passwordControl: string,
    rePasswordControl: string
): ValidatorFn {
    return (control) => {
        const firstPass = control.get(passwordControl);
        const secondass = control.get(rePasswordControl);
        const areMatching = firstPass?.value == secondass?.value;
        return areMatching ? null : { matchPasswordsValidator: true };
    };
}
