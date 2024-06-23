import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface CounterState {
  token: string;
}

const initialState: CounterState = {
  token: "",
};

export const counterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = counterSlice.actions;

export default counterSlice.reducer;
