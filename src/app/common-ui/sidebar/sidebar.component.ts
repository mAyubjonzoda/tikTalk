import { Component } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-sidebar',
  imports: [SvgIconComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  home = 'home';

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
}
