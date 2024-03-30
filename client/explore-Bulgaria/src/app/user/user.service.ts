import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoading = false;
  constructor() { }

  login(){
    this.isLoading = true
  }

  logout(){
    this.isLoading = false
  }
}
