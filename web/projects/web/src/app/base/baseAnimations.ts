import { trigger, transition, style, animate } from '@angular/animations';

export const baseAnimations = [
  trigger('slideIn', [
    transition(':enter', [
      // Styl początkowy: lekko przesunięty w dół i półprzezroczysty
      style({ transform: 'translateY(20px)', opacity: 0 }),
      // Animacja: Przesunięcie do właściwej pozycji i zwiększenie opacity
      animate(
        '300ms ease-out',
        style({ transform: 'translateY(0)', opacity: 1 })
      ),
    ]),
    transition(':leave', [
      // Animacja na opuszczenie elementu: opcjonalna
      animate(
        '300ms ease-in',
        style({ transform: 'translateY(20px)', opacity: 0 })
      ),
    ]),
  ]),
];
