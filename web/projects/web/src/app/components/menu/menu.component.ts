import { Component, Input, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule, NgbModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss', 'hamburger.scss'],
})
export class MenuComponent {
  @ViewChild('user') user: any;

  menuOpen: boolean = true;

  protected _auth = inject(AuthService);
  protected _modal = inject(ModalService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  protected toggleMenu() {
    this.menuOpen = !this.menuOpen;
    if (this.menuOpen) {
      document.body.classList.remove('menu-closed');
    } else {
      document.body.classList.add('menu-closed');
    }
  }

  protected changePassword() {
    // this.user.toggle();
  }

  protected async logout() {
    this.user.toggle();
    if (
      await this._modal.openConfirmationModal(
        'Czy na pewno chcesz się wylogować?'
      )
    ) {
      this._auth.logout();
    }
  }
}
