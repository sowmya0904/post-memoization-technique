import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import fetchUpdatedPosts from '../fetch/fetchUpdatedPosts';
import sortPosts from '../utils/sortPosts';

// fetch updated posts
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, { getState }) => {
  const { posts } = getState().posts;
  if (posts.length > 0) {
    return posts; 
  }
  const fetchedPosts = await fetchUpdatedPosts();
  return fetchedPosts;
});

//fetch users from a third-party API
export const fetchUsers = createAsyncThunk('posts/fetchUsers', async (_, { getState }) => {
  const { users } = getState().posts;
  if (users.length > 0) {
    return users; 
  }
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const fetchedUsers = await response.json();
  return fetchedUsers;
});

const initialState = {
  posts: [],
  users: [],
  status: 'idle',
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost(state, action) {
      const newId = state.posts.length ? Math.max(...state.posts.map(post => post.id)) + 1 : 1;
      state.posts.unshift({ id: newId, ...action.payload });
    },
    updatePost(state, action) {
      const { id, title, body } = action.payload;
      const existingPost = state.posts.find(post => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.body = body;
      }
    },
    deletePost(state, action) {
      state.posts = state.posts.filter(post => post.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (state.posts.length === 0) {
          state.posts = action.payload.map((post, index) => ({
            ...post,
            id: index + 1,
          }));
        }
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        if (state.users.length === 0) {
          state.users = action.payload;
        }
      });
  },
});

export const { addPost, updatePost, deletePost } = postsSlice.actions;

export default postsSlice.reducer;

// Memoized selector for sorted posts
export const selectSortedPosts = createSelector(
  (state) => state.posts.posts,
  (posts) => sortPosts(posts)
);

// Memoized selector for users
export const selectUsers = createSelector(
  (state) => state.posts.users,
  (users) => users
);

export const makeSelectPostById = () =>
  createSelector(
    [(state, postId) => postId, (state) => state.posts.posts],
    (postId, posts) => posts.find(post => post.id === postId) || null
  );
