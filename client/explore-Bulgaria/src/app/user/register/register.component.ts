import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/shared/utils/email-validator';
import { matchPasswordsValidator } from 'src/app/shared/utils/match-passwords-validator';
import { EMAIL_DOMAINS } from 'src/environments/environment';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
    errorMessage: string = '';

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private router: Router
    ) {}

    form = this.fb.group({
        email: ['', [Validators.required, emailValidator(EMAIL_DOMAINS)]],
        username: ['', [Validators.required, Validators.minLength(5)]],
        passGroup: this.fb.group(
            {
                password: ['', [Validators.required]],
                rePassword: ['', [Validators.required]],
            },
            { validators: [matchPasswordsValidator('password', 'rePassword')] }
        ),
    });

    register(): void {
        if (this.form.invalid) {
            return;
        }

        const {
            email,
            username,
            passGroup: { password, rePassword } = {},
        } = this.form.value;

        this.userService
            .register(email!, username!, password!, rePassword!)
            .subscribe({
                next: () => {
                    this.router.navigate(['/']);
                },
                error: (error) => {
                    if (error.status === 409) {
                        this.errorMessage = 'This email is already registered';
                    } else {
                        this.errorMessage =
                            'Registration error. Please try again.';
                    }
                },
            });
    }
}
