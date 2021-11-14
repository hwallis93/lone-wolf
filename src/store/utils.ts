import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

export const localise =
  <T>(actionCreator: ActionCreatorWithPayload<T>) =>
  (payload: T) => {
    return { type: "local", payload: actionCreator(payload) };
  };
