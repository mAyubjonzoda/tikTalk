import { createReducer, on } from '@ngrx/store';
import { loadPostsSuccess } from './actions';
import { Post } from '@tt/interfaces/post';
export interface PostState {
  posts: Post[];
  loading: boolean;
  error: any;
}

export const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

export const postReducer = createReducer(
  initialState,
  on(loadPostsSuccess, (state, { posts }) => ({ ...state, posts }))
);
