import {createSlice} from '@reduxjs/toolkit'

const subscribeSlice = createSlice({
    name: 'subscribe',
    initialState: {
        isSubscribed: null
    },
    reducers: {
        setSubscriptionStatus: (state, action) => {
            state.isSubscribed = action.payload;
        },
    },
});


export const  {setSubscriptionStatus} = subscribeSlice.actions;

export const selectIsSubscribed = (state) => state.subscribe.isSubscribed;

export default subscribeSlice.reducer