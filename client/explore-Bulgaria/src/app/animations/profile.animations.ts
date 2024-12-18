import { 
    trigger, 
    state,
    style, 
    animate, 
    transition,
    query,
    stagger,
    group
  } from '@angular/animations';
  
  export const profileAnimations = {
    tabSwitch: trigger('tabSwitch', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
  
    contentCards: trigger('contentCards', [
      transition(':enter', [
        query('.content-card', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger(80, [
            animate('500ms ease-out', 
              style({ opacity: 1, transform: 'translateY(0)' })
            )
          ])
        ], { optional: true })
      ])
    ]),
  
    sectionFade: trigger('sectionFade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
      ])
    ]),
  
    buttonHover: trigger('buttonHover', [
      state('normal', style({
        transform: 'scale(1)'
      })),
      state('hovered', style({
        transform: 'scale(1.05)'
      })),
      transition('normal <=> hovered', [
        animate('200ms ease-out')
      ])
    ])
  };