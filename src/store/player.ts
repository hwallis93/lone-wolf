import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "../client/types";

interface PlayersState {
  local: Player["name"] | null;
  all: Player[];
}
const initialState: PlayersState = {
  local: null,
  all: [],
};

export const players = createSlice({
  name: "players",
  initialState,
  reducers: {
    addPlayer: (state, action: PayloadAction<Player>) => {
      state.all.push(action.payload);
    },
    overwritePlayers: (state, action: PayloadAction<Player[]>) => {
      state.all = action.payload;
    },
    setLocalPlayer: (state, action: PayloadAction<string>) => {
      state.local = action.payload;
    },
  },
});

export const { addPlayer, setLocalPlayer, overwritePlayers } = players.actions;
