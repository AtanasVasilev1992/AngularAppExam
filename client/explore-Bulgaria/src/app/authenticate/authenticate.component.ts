import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit{
  isAuthenticating = true;
  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: () => {
        this.isAuthenticating = false; // Потребителят е автентикиран
      },
      error: () => {
        this.isAuthenticating = true; // Потребителят не е автентикиран
      }
    });
  }

}