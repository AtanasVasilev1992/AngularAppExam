import { ValidatorFn } from "@angular/forms";

export function emailValidator(damains: string[]): ValidatorFn {
  const damainStr = damains.join('|')
    const regExp = new RegExp(`[A-Za-z0-9]+@gmail\.(${damainStr})`);
    
    return (control) => {
      const isEmailInvalid = control.value === '' || regExp.test(control.value)
   
      return isEmailInvalid ? null : { emailValidator: true};
    };
  }