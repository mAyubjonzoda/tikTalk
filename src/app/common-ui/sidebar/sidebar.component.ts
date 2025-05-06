import { Component, inject, OnInit } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { SidebarCardComponent } from './sidebar-card/sidebar-card.component';
import { ProfileService } from '../../data/services/profile.service';
import { AsyncPipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';

@Component({
  selector: 'app-sidebar',
  imports: [SvgIconComponent, SidebarCardComponent, AsyncPipe, ImgUrlPipe],
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
      route: '/',
    },
    {
      icon: 'chats',
      label: 'Чаты',
      route: '/',
    },
    {
      icon: 'search',
      label: 'Поиск',
      route: '/',
    },
  ];

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }
}
