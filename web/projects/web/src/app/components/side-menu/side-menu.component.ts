import { Component, Input } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent {
  @Input() routes: Routes;
}
