import {trigger, state, animate, style, transition, query} from '@angular/animations';

export function routerTransition() {
  return slideFade();
}

function slideFade() {
  return trigger('routerTransition', [
    state('void', style({position: 'fixed', width: '980px', display: 'block' }) ),
    state('*', style({position: 'relative', width: '980px', display: 'block' }) ),
    transition(':enter', [
        style({ opacity: 0 }),
      animate('0.5s ease-in-out', style({ opacity: 1 }))
      ]),
    transition(':leave', [
      style({ opacity: 1 }),
      animate('0.5s ease-in-out', style({ opacity: 0, position: 'fixed' }))
      ])
    ]);
}

function slideToRight() {
  return trigger('routerTransition', [
    state('void', style({position: 'fixed', width: '980px'}) ),
    state('*', style({position: 'fixed', width: '980px'}) ),
    transition(':enter', [
      style({transform: 'translateX(-100%)', opacity: 0}),
      animate('1s ease-in-out', style({transform: 'translateX(0%)', opacity: 1 }))
      ]),
    transition(':leave', [
      style({transform: 'translateX(0%)', opacity: 1 }),
      animate('1s ease-in-out', style({transform: 'translateX(100%)', opacity: 0 }))
      ])
    ]);
}
