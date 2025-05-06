import { Component, Input } from '@angular/core';
import { Profile } from '../../../data/interfaces/profile.interface';
import { ImgUrlPipe } from '../../../helpers/pipes/img-url.pipe';

@Component({
  selector: 'app-sidebar-card',
  imports: [ImgUrlPipe],
  templateUrl: './sidebar-card.component.html',
  styleUrl: './sidebar-card.component.scss',
})
export class SidebarCardComponent {
  @Input() profile!: Profile;
}
