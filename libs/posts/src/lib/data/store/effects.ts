import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { loadPosts, loadPostsFailure, loadPostsSuccess } from './actions';
import { Post } from '@tt/interfaces/post';

@Injectable()
export class PostEffects {
  http = inject(HttpClient);
  actions$ = inject(Actions);
  private url = 'https://icherniakov.ru/yt-course/';

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPosts),
      switchMap(() =>
        this.http.get<Post[]>(`${this.url}post/`).pipe(
          map((posts) => loadPostsSuccess({ posts })),
          catchError((error) => of(loadPostsFailure({ error })))
        )
      )
    )
  );
}
