import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Address, Feature } from './mock.interface';

@Injectable({
  providedIn: 'root',
})
export class MockService {
  http = inject(HttpClient);
  getAddresses() {
    return this.http.get<Address[]>('assets/data/mosc.json');
  }

  getFeatures(): Observable<Feature[]> {
    return of([
      {
        code: 'lift',
        label: 'Подъём на этаж',
        value: true,
      },
      {
        code: 'strong-package',
        label: 'Усиленная упаковка',
        value: true,
      },
      {
        code: 'fast',
        label: 'Срочная доставка',
        value: false,
      },
    ]);
  }
  constructor() {}
}
