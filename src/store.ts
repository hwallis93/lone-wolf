import { configureStore } from "@reduxjs/toolkit";
import { stateSlice } from "./counterSlice";

export const store = configureStore({
  reducer: {
    counter: stateSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
