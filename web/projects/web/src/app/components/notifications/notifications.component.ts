import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Component, inject } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'lib-notifications',
  standalone: true,
  imports: [NgbModule],
  templateUrl: './notifications.component.html',
})
export class NotificationsComponent {
  protected toastService = inject(NotificationsService);
}
