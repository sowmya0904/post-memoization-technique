import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    signedIn: false,
  },
  reducers: {
    toggleSignIn(state) {
      state.signedIn = !state.signedIn;
    },
  },
});

export const { toggleSignIn } = authSlice.actions;

export default authSlice.reducer;