import { Component, Input } from '@angular/core';
import { Profile } from '@tt/profile';
import { ImgUrlPipe } from '@tt/common-ui';

@Component({
  selector: 'app-sidebar-card',
  imports: [ImgUrlPipe],
  templateUrl: './sidebar-card.component.html',
  styleUrl: './sidebar-card.component.scss',
})
export class SidebarCardComponent {
  @Input() profile!: Profile;
}
