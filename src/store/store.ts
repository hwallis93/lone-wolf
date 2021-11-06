import {
  configureStore,
  createSlice,
  applyMiddleware,
  PayloadAction,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import * as wsClient from "../client/websocket-client";

interface sliceState {
  count: number;
  localName: string | null;
  names: string[];
}
const initialState: sliceState = {
  localName: null,
  count: 0,
  names: [],
};

export const slice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.localName = action.payload;
    },
    addName: (state, action: PayloadAction<string>) => {
      state.names.push(action.payload);
    },
  },
});

export const { increment, setName } = slice.actions;

const remoteMiddleware =
  () => (next: any) => (action: Record<string, unknown>) => {
    // If the action comes from the server then its payload is another action. Send that onwards
    if (action.type === "fromServer") {
      next(action.payload);
      return;
    }
    switch (action.type) {
      // If the action is setting the player's name then we don't want to broadcast as it's
      // the only thing that's different for each player. We do however broadcast that a new name
      // has been added
      case slice.name + "/setName":
        next(action);
        wsClient.sendObject({
          type: slice.name + "/addName",
          payload: action.payload,
        });
        break;
      default:
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
