import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { EMAIL_DOMAINS } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  domains = EMAIL_DOMAINS;
  errorMessage: string | undefined;
  constructor(private userService: UserService, private router: Router){}

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }
  
    const { email, password } = form.value;
  
    this.userService.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/'])
      },
      error: (error) => {
        if (error.status === 403) {
          this.errorMessage = 'Incorrect email or password';
        } else if (error.status === 409) {
          this.errorMessage = 'This email is not registered';
        } else {
          this.errorMessage = 'Login error. Please try again.';
        }
      }
    });
  }

  logout() {
    localStorage.removeItem('userToken');
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
