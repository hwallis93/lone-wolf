import {
  configureStore,
  createSlice,
  applyMiddleware,
  PayloadAction,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Player } from "../client/types";
import * as wsClient from "../client/websocket-client";
import { gm } from "./gm";
import { loneWolf } from "./lonewolf";
import { players } from "./player";

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
      case players.name + "/setLocalPlayer":
        next(action);
        break;
      default:
        wsClient.sendObject(action);
    }
  };

export const store = configureStore({
  reducer: {
    lonewolf: loneWolf.reducer,
    players: players.reducer,
    gm: gm.reducer,
  },
  middleware: [remoteMiddleware],
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
