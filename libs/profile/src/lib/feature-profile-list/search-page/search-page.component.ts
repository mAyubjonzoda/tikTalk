import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
} from '@angular/core';
import { ProfileCardComponent } from '../../ui';
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component';
import { Store } from '@ngrx/store';
import { profileActions, selectFilteredProfiles } from '../../data';
import { InfiniteScrollTriggerComponent } from '../../../../../common-ui/src/lib/components/ist/infinite-scroll-trigger.component';

@Component({
  selector: 'app-search-page',
  imports: [
    ProfileCardComponent,
    ProfileFiltersComponent,
    InfiniteScrollTriggerComponent,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent implements AfterViewInit {
  store = inject(Store);
  profiles = this.store.selectSignal(selectFilteredProfiles);

  loadMore() {
    this.store.dispatch(profileActions.setPage({}));
  }

  r2 = inject(Renderer2);

  @HostListener('window:resize')
  onResize() {
    this.resizeFeed();
  }

  hostElement = inject(ElementRef);

  ngAfterViewInit(): void {
    this.resizeFeed();
  }
  resizeFeed() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 24 - 24;
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }
}
