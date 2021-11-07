import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import * as wsClient from "../client/websocket-client";
import { players } from "../store/player";
import reducer from "../store/reducer";

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
  reducer,
  middleware: [remoteMiddleware],
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
