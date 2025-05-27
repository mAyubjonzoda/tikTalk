import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, startWith, Subscription } from 'rxjs';
import { ProfileService } from '@tt/data-access';
import { Store } from '@ngrx/store';
import { profileActions } from '../../data';

@Component({
  selector: 'app-profile-filters',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss',
})
export class ProfileFiltersComponent implements OnDestroy {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);

  store = inject(Store);
  searchFormSub!: Subscription;

  searchForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: [''],
  });

  constructor() {
    this.searchFormSub = this.searchForm.valueChanges
      .pipe(startWith({}), debounceTime(500))
      .subscribe((formValue) => {
        return this.store.dispatch(
          profileActions.filterEvents({ filters: formValue })
        );
      });
  }

  ngOnDestroy(): void {
    this.searchFormSub.unsubscribe();
  }
}
