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
import { Store } from '@ngxs/store';
import {
  ProfileStates,
  profileStore,
  selectFilteredProfiles,
} from '../../data';
import { ProfileService } from '@tt/data-access';

@Component({
  selector: 'app-search-page',
  imports: [ProfileCardComponent, ProfileFiltersComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent implements AfterViewInit {
  profileService = inject(ProfileService);

  store = inject(profileStore);
  profiles = this.profileService.select('profiles');

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
