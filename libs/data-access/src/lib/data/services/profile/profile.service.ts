import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

import { GlobalStoreService, Pageble } from '@tt/shared';
import { map, tap } from 'rxjs';
import { Profile } from '@tt/interfaces/profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private http = inject(HttpClient);
  private url = 'https://icherniakov.ru/yt-course/';
  private globalStoreService = inject(GlobalStoreService);

  me = signal<Profile | null>(null);
  filteredProfile = signal<Profile[]>([]);

  getSubscribersShortList(num = 3) {
    return this.http
      .get<Pageble<Profile>>(`${this.url}account/subscribers/?page=1&size=50`)
      .pipe(map((res: Pageble<Profile>) => res.items.slice(0, num)));
  }

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.url}account/test_accounts`);
  }

  getAccount(id: string) {
    return this.http.get<Profile>(`${this.url}account/${id}`);
  }

  getMe() {
    return this.http.get<Profile>(`${this.url}account/me`).pipe(
      tap((res) => {
        this.me.set(res);
        this.globalStoreService.me.set(res);
      })
    );
  }

  patchProfile(data: Partial<Profile>) {
    return this.http.patch<Profile>(`${this.url}account/me`, data);
  }

  uploadAvatar(file: File) {
    const fd = new FormData();
    fd.append('image', file);

    return this.http.post<Profile>(`${this.url}account/upload_image`, fd);
  }

  filterProfiles(params: Record<string, any>) {
    return this.http
      .get<Pageble<Profile>>(`${this.url}account/accounts`, {
        params,
      })
      .pipe(tap((res) => this.filteredProfile.set(res.items)));
  }
}
