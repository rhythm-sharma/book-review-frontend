import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface CounterState {
  token: string;
  user: any;
}

const initialState: CounterState = {
  token: "",
  user: null,
};

export const counterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setToken, setUser } = counterSlice.actions;

export default counterSlice.reducer;
