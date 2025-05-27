import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { ProfileService } from '@tt/data-access';
import { Profile } from '@tt/interfaces/profile';
import { pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
interface ProfileStateModel {
  profiles: Profile[];
  profileFilters: Record<string, any>;
}

const initialState: ProfileStateModel = {
  profiles: [],
  profileFilters: {},
};

export const profileStore = signalStore(
  withState(initialState),
  withComputed(({ profiles }) => {
    return {
      profiles2: computed(() =>
        profiles().map((profile) => ({ ...profile, lastName: 'BLA_BLA' }))
      ),
    };
  }),
  withMethods((state, profileService = inject(ProfileService)) => {
    const filterProfiles = rxMethod<Record<string, any>>(
      pipe(
        switchMap((filters) => {
          return profileService.filterProfiles(filters).pipe(
            tap((res) => {
              patchState(state, { profiles: res.items });
            })
          );
        })
      )
    );
    return {
      filterProfiles,
    };
  })
);
