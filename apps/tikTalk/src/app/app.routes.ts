import { Routes } from '@angular/router';
import { LayoutComponent } from '@tt/layout';
import {
  ProfilePageComponent,
  SearchPageComponent,
  SettingsPageComponent,
} from '@tt/profile';
import { canActivateAuth, LoginPageComponent } from '@tt/auth';
import { chatsRoutes } from '@tt/chats';
import { FormPageComponent } from './pages/form-page/form-page.component';
import { provideState } from '@ngrx/store';
import { ProfileEffects, profileFeature } from '@tt/profile';
import { provideEffects } from '@ngrx/effects';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      {
        path: 'search',
        component: SearchPageComponent,
        providers: [
          provideState(profileFeature),
          provideEffects(ProfileEffects),
        ],
      },
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
