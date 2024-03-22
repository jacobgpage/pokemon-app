import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface NavBarState {
  value: number;
}

const initialState: NavBarState = {
  value: 0,
};

const navBarSlice = createSlice({
  name: "navBar",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { set } = navBarSlice.actions;

export default navBarSlice.reducer;
