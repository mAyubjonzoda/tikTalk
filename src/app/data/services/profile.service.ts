import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Profile } from '../interfaces/profile.interface';
import { Pageble } from '../interfaces/pageble.interface';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http = inject(HttpClient);
  private url = 'https://icherniakov.ru/yt-course/';

  me = signal<Profile | null>(null);

  constructor() {}
  getSubscribersShortList() {
    return this.http
      .get<Pageble<Profile>>(`${this.url}account/subscribers/?page=1&size=50`)
      .pipe(map((res: Pageble<Profile>) => res.items.slice(1, 4)));
  }

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.url}account/test_accounts`);
  }

  getMe() {
    return this.http
      .get<Profile>(`${this.url}account/me`)
      .pipe(tap((res) => this.me.set(res)));
  }
}
