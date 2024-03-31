import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/shared/utils/email-validator';
import { matchPasswordsValidator } from 'src/app/shared/utils/match-passwords-validator';
import { EMAIL_DOMAINS } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private fb: FormBuilder) {}

  form = this.fb.group({
    email: ['', [Validators.required, emailValidator(EMAIL_DOMAINS)]],
    username: ['', [Validators.required, Validators.minLength(5)]],
    country: ['', [Validators.required, Validators.minLength(2)]],
    city: ['', [Validators.required]],
    passGroup: this.fb.group({ password: ['',[Validators.required]], 
    rePassword: ['',[Validators.required]] }, {validators: [matchPasswordsValidator('password', 'rePassword')]}),
  });

  register(): void {
    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value);
  }
}
