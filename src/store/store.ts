import { configureStore, createSlice, applyMiddleware } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import * as wsClient from "../client/websocket-client";

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

const remoteMiddleware =
  () => (next: any) => (action: Record<string, unknown>) => {
    // If the action comes from the server then its payload is another action. Send that onwards
    if (action.type === "fromServer") {
      next(action.payload);
    } else {
      wsClient.sendObject(action);
    }
  };

export const store = configureStore({
  reducer: {
    slice: slice.reducer,
  },
  middleware: [remoteMiddleware],
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
