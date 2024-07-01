import { createSlice } from '@reduxjs/toolkit';

const initialState: {
  userLoading: boolean;
  loggedInUser: any | undefined;
  assistantResponse: string;
} = {
  userLoading: false,
  loggedInUser: undefined,
  assistantResponse: '',
};

const usersSlice = createSlice({
  name: 'usersSlice',
  initialState: initialState,
  reducers: {
    loggedInUserAction: (state, action) => {
      state.loggedInUser = action.payload;
    },
  },
});

export const { loggedInUserAction } = usersSlice.actions;
export default usersSlice.reducer;
