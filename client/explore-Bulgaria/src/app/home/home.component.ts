import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { 
  trigger, 
  state, 
  style, 
  animate, 
  transition,
  stagger,
  query,
  animateChild
} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    // Hero section fade in
    trigger('heroFadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('0.8s ease-out', 
          style({ opacity: 1, transform: 'translateY(0)' })
        )
      ])
    ]),
    
    // Feature cards stagger animation
    trigger('featureList', [
      transition(':enter', [
        query('@featureItem', [
          stagger(100, [
            animateChild()
          ])
        ])
      ])
    ]),
    
    // Individual feature card animation
    trigger('featureItem', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        animate('0.5s ease-out', 
          style({ opacity: 1, transform: 'translateY(0)' })
        )
      ])
    ])
  ]
})
export class HomeComponent {
  constructor(public userService: UserService) {}

  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }
}