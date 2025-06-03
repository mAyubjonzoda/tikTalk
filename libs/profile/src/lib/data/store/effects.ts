import { inject, Injectable } from '@angular/core';
import { ProfileService } from '@tt/data-access';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { profileActions } from './actions';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectFilters, selectProfilePageable } from './selectors';

@Injectable({
  providedIn: 'root',
})
export class ProfileEffects {
  profileService = inject(ProfileService);
  actions$ = inject(Actions);
  store = inject(Store);

  filterProfile = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.filterEvents, profileActions.setPage),
      withLatestFrom(
        this.store.select(selectFilters),
        this.store.select(selectProfilePageable)
      ),
      switchMap(([_, filters, pageable]) => {
        console.log([_, filters, pageable]);

        return this.profileService.filterProfiles({
          ...pageable,
          ...filters,
        });
      }),
      map((res) => profileActions.profilesLoaded({ profiles: res.items }))
    );
  });
}
