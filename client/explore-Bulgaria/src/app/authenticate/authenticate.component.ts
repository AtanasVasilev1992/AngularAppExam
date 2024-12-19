import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';

@Component({
    selector: 'app-authenticate',
    templateUrl: './authenticate.component.html',
    styleUrls: ['./authenticate.component.css'],
})
export class AuthenticateComponent implements OnInit {
    isAuthenticating = true;

    constructor(
        private userService: UserService,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {
        if (this.authService.getToken()) {
            this.userService
                .getProfile()
                .pipe(
                    catchError((err) => {
                        console.error('Authentication error:', err);
                        this.authService.clearTokens();
                        this.isAuthenticating = false;
                        this.router.navigate(['/auth/login']);
                        return EMPTY;
                    })
                )
                .subscribe({
                    next: (user) => {
                        if (user) {
                            console.log('Authentication successful');
                            this.isAuthenticating = false;
                        } else {
                            console.log('Invalid authentication response');
                            this.authService.clearTokens();
                            this.isAuthenticating = false;
                            this.router.navigate(['/auth/login']);
                        }
                    },
                });
        } else {
            this.isAuthenticating = false;
        }
    }
}
