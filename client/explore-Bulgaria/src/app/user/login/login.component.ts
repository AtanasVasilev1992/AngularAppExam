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

  login(form: NgForm){
    if(form.invalid){
      return
    }

    const { email, password } = form.value;
    // localStorage.setItem('')

    this.userService.login(email, password).subscribe(()=> {
      localStorage.setItem('[user]', 'token')
      this.router.navigate(['/'])
    })
    
  }

  logout(){
    this.userService.logout();
    this.router.navigate(['/'])
  }
}
