import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GmState {
  name: string | null;
}
const initialState: GmState = {
  name: null,
};

export const gm = createSlice({
  name: "gm",
  initialState,
  reducers: {
    setGmName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { setGmName } = gm.actions;
