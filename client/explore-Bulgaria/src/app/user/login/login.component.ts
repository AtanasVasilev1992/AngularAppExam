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
  constructor(private userService: UserService, private router: Router){}

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }
  
    const { email, password } = form.value;
  
    this.userService.login(email, password).subscribe({
      next: () => {
        // Токенът вече е записан в услугата
        this.router.navigate(['/'])
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }

  logout() {
    localStorage.removeItem('userToken');
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
