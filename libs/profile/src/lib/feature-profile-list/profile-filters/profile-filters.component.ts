import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, filter, startWith, Subscription } from 'rxjs';
import { ProfileService } from '@tt/data-access';
import { Store } from '@ngxs/store';
import { profileActions } from '../../data';
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
        return this.store.dispatch(new FilterEvents(formValue));
      });
  }

  ngOnDestroy(): void {
    this.searchFormSub.unsubscribe();
  }
}
