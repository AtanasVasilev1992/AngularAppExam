import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit{
  isAuthenticating = true;
  router: any;
  constructor(private userService: UserService){}

  ngOnInit(): void {
    if (this.userService.isLoggedIn) {
      this.userService.getProfile().subscribe({
        next: () => {
          this.isAuthenticating = false; 
          this.router.navigate(['/']); 
        },
        error: () => {
          this.isAuthenticating = true; 
          this.userService.logout(); 
        }
      });
    }
  }

}