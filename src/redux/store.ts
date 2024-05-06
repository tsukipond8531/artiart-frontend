import { configureStore } from '@reduxjs/toolkit';
import usersSlice from './slices/AdminsSlice';

export const store = configureStore({
  reducer: {
    usersSlice: usersSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;