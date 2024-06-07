import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonIcon, IonItem, IonList } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IonList, IonIcon, IonItem],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'mobile';
}
