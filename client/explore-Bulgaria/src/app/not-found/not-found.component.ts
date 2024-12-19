import { Component } from '@angular/core';
import {
    trigger,
    style,
    animate,
    transition,
} from '@angular/animations';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.css'],
    animations: [
        trigger('containerAnimation', [
            transition(':enter', [
                style({ opacity: 0, transform: 'scale(0.3)' }),
                animate(
                    '0.5s ease-out',
                    style({ opacity: 1, transform: 'scale(1)' })
                ),
            ]),
        ]),
    ],
})
export class NotFoundComponent {}
