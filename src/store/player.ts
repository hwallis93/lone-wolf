import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "../client/types";

interface PlayersState {
  local: Player["name"] | null;
  all: Player[];
  diceRolling: boolean;
  diceValue: number;
}
const initialState: PlayersState = {
  local: null,
  all: [],
  diceRolling: false,
  diceValue: 0,
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
    setDiceRolling: (state, action: PayloadAction<boolean>) => {
      state.diceRolling = action.payload;
    },
    setDiceValue: (state, action: PayloadAction<number>) => {
      const number = action.payload;
      if (number > 10 || number < 0) return;

      state.diceValue = number;
    },
  },
});

export const {
  addPlayer,
  setLocalPlayer,
  overwritePlayers,
  setDiceRolling,
  setDiceValue,
} = players.actions;
