import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { LayoutComponent } from './common-ui/layout/layout.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { canActivateAuth } from '@tt/auth';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { ChatsComponent } from './pages/chats/chats.component';
import { chatsRoutes } from './pages/chats/chatsRoutes';
import { FormPageComponent } from './pages/form-page/form-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      { path: 'search', component: SearchPageComponent },
      { path: 'profile/:id', component: ProfilePageComponent },
      { path: 'settings/:id', component: SettingsPageComponent },
      { path: 'chats', loadChildren: () => chatsRoutes },
    ],
    canActivate: [canActivateAuth],
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'form', component: FormPageComponent },
  { path: '**', redirectTo: 'form' },
];
