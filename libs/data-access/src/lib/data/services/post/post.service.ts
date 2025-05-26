import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
  Comment,
  CommentCreateDto,
  Post,
  PostCreateDto,
} from '@tt/interfaces/post';
import { map, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private http = inject(HttpClient);
  private url = 'https://icherniakov.ru/yt-course/';

  posts = signal<Post[]>([]);

  createPost(payload: PostCreateDto) {
    return this.http
      .post<Post>(`${this.url}post/`, payload)
      .pipe(switchMap(() => this.fetchPosts()));
  }

  createComment(payload: CommentCreateDto) {
    return this.http.post<Comment>(`${this.url}comment/`, payload);
  }

  getCommentsByPostId(postId: number) {
    return this.http
      .get<Post>(`${this.url}post/${postId}`)
      .pipe(map((res) => res.comments));
  }

  fetchPosts() {
    return this.http
      .get<Post[]>(`${this.url}post/`)
      .pipe(tap((res) => this.posts.set(res)));
  }
}
