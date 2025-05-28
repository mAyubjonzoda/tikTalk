import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, filter, startWith, Subscription, switchMap } from 'rxjs';
import { ProfileService } from '@tt/data-access';
import { Store } from '@ngxs/store';
import { profileActions, profileStore } from '../../data';
import { FilterEvents } from '../../data/store/actions.ngxs';

@Component({
  selector: 'app-profile-filters',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss',
})
export class ProfileFiltersComponent implements OnDestroy {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);

  store = inject(profileStore);
  searchFormSub!: Subscription;

  searchForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: [''],
  });

  constructor() {
    this.searchFormSub = this.searchForm.valueChanges
      .pipe(
        startWith({}),
        debounceTime(500),
        switchMap((formValue) => {
          return this.profileService.filterProfiles(formValue);
        })
      )
      .subscribe((formValue) => {
        // return this.store.dispatch(new FilterEvents(formValue));
        // return this.store.filterProfiles(formValue);
      });
  }

  ngOnDestroy(): void {
    this.searchFormSub.unsubscribe();
  }
}
