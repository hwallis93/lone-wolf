import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment } = stateSlice.actions;
