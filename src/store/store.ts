import { configureStore, createSlice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const slice = createSlice({
  name: "slice",
  initialState: {
    count: 0,
  },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
  },
});

export const { increment } = slice.actions;

export const store = configureStore({
  reducer: {
    slice: slice.reducer,
  },
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
