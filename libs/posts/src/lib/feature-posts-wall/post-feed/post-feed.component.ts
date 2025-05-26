import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
} from '@angular/core';
import { PostInputComponent } from '../../ui/post-input/post-input.component';
import { PostComponent } from '../post/post.component';
import { PostService } from '@tt/data-access';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-post-feed',
  imports: [PostInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
})
export class PostFeedComponent implements AfterViewInit {
  postService = inject(PostService);
  r2 = inject(Renderer2);

  feed = this.postService.posts;

  @HostListener('window:resize')
  onResize() {
    this.resizeFeed();
  }

  hostElement = inject(ElementRef);
  constructor() {
    firstValueFrom(this.postService.fetchPosts());
  }

  ngAfterViewInit(): void {
    this.resizeFeed();
  }
  resizeFeed() {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 24 - 24;
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }
}
