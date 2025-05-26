import { Component, inject, OnInit } from '@angular/core';
import { SvgIconComponent, ImgUrlPipe } from '@tt/common-ui';
import { SidebarCardComponent } from './sidebar-card/sidebar-card.component';
import { ProfileService } from '@tt/data-access';
import { AsyncPipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';

import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLinkActive,
    SvgIconComponent,
    SidebarCardComponent,
    AsyncPipe,
    ImgUrlPipe,
    RouterLink,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  profileService = inject(ProfileService);

  subscribers$ = this.profileService.getSubscribersShortList();

  me = this.profileService.me;

  menuItems = [
    {
      icon: 'home',
      label: 'Моя страница',
      route: 'profile/me',
    },
    {
      icon: 'chats',
      label: 'Чаты',
      route: 'chats',
    },
    {
      icon: 'search',
      label: 'Поиск',
      route: 'search',
    },
  ];

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }
}
