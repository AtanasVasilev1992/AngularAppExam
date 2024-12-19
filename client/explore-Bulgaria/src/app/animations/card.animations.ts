import {
    trigger,
    style,
    animate,
    transition,
    query,
    stagger,
} from '@angular/animations';

export const cardAnimations = {
    cardList: trigger('cardList', [
        transition(':enter', [
            query(
                '.card',
                [
                    style({ opacity: 0, transform: 'translateY(50px)' }),
                    stagger(100, [
                        animate(
                            '0.5s ease-out',
                            style({ opacity: 1, transform: 'translateY(0)' })
                        ),
                    ]),
                ],
                { optional: true }
            ),
        ]),
    ]),

    buttonHover: trigger('buttonHover', [
        transition(':enter', [
            style({ transform: 'scale(1)' }),
            animate('200ms ease-out', style({ transform: 'scale(1.05)' })),
        ]),
        transition(':leave', [
            animate('200ms ease-in', style({ transform: 'scale(1)' })),
        ]),
    ]),
};
