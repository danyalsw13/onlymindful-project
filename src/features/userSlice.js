//import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
//import { fetchCount } from './counterAPI';

import { createSlice } from '@reduxjs/toolkit';


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
   login: (state, action) => {
    state.user = action.payload;
   },
   logout: (state) => {
    state.user = null;
   }
   //setSubscriptionStatus: (state, action) => {
    //state.isSubscribed = action.payload;
  // }
   
  },
  
});

export const {login, logout} = userSlice.actions;

// how do i get the value out of global store
// use that inside the component
//select does that
export const selectUser = (state) => state.user.user;

//export const selectIsSubscribed = (state) => state.user.isSubscribed;


export default userSlice.reducer;
