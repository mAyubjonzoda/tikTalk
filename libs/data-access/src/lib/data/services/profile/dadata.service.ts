import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DadataToken } from './token';
import { map } from 'rxjs';
import { DadataSuggestion } from '@tt/interfaces/profile';

@Injectable({
  providedIn: 'root',
})
export class DadataService {
  http = inject(HttpClient);
  private url =
    'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';

  getSuggestions(query: string) {
    return this.http
      .post<{ suggestions: any }>(
        this.url,
        { query },
        {
          headers: {
            Authorization: `Token ${DadataToken}`,
          },
        }
      )
      .pipe(
        map((res: any) => {
          return Array.from(
            new Set(res.suggestions.map((s: any) => s.data.city))
          );
        })
      );
  }
}
