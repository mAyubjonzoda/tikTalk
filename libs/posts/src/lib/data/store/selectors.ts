import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState } from './reducer';

export const selectPostState = createFeatureSelector<PostState>('posts');

export const selectPosts = createSelector(
  selectPostState,
  (state) => state.posts
);

export const selectLoading = createSelector(
  selectPostState,
  (state) => state.loading
);
