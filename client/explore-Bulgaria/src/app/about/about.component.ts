import { Component } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
})
export class AboutComponent {
    constructor(public userService: UserService) {}

    get isLoggedIn(): boolean {
        return this.userService.isLoggedIn();
    }
}
