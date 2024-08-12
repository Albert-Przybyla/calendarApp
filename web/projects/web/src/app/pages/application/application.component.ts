import { Component } from '@angular/core';
import { CalendarComponent } from '../../components/calendar/calendar.component';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from '../../components/menu/menu.component';
import { getRoutesForApp } from '../../app.routes';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [SideMenuComponent, RouterOutlet, MenuComponent],
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss',
})
export class ApplicationComponent {
  routes = getRoutesForApp();
}
