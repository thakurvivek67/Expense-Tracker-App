// store.js or index.js
import { configureStore } from '@reduxjs/toolkit';
import userdetailSlice from './UserdetailSlice';

const Store = configureStore({
  reducer: {
    userDetail: userdetailSlice.reducer,
    // Add other reducers here if needed
  },
});

export default Store;

