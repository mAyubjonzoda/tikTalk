import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import { PostInputComponent } from '../../ui/post-input/post-input.component';
import { PostComponent } from '../post/post.component';
import { PostService } from '@tt/data-access';
import { Store } from '@ngrx/store';
import { selectPosts } from '../../data/store/selectors';
import { loadPosts } from '../../data/store/actions';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-post-feed',
  imports: [PostInputComponent, PostComponent, AsyncPipe],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
})
export class PostFeedComponent implements OnInit, AfterViewInit {
  postService = inject(PostService);
  r2 = inject(Renderer2);
  hostElement = inject(ElementRef);
  store = inject(Store);

  // feed = this.postService.posts;
  feed = this.store.select(selectPosts);

  @HostListener('window:resize')
  onResize() {
    this.resizeFeed();
  }

  ngOnInit(): void {
    this.store.dispatch(loadPosts());
  }

  ngAfterViewInit(): void {
    this.resizeFeed();
  }
  resizeFeed() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 24 - 24;
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }

  onPostCreated() {
    this.store.dispatch(loadPosts());
  }
}
