import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "../client/types";

interface PlayersState {
  local: Player["name"] | null;
  all: Player[];
  diceRolling: boolean;
  diceValue: number;
  showDisciplines: boolean;
}
const initialState: PlayersState = {
  local: null,
  all: [],
  diceRolling: false,
  diceValue: 0,
  showDisciplines: true,
};

export const players = createSlice({
  name: "players",
  initialState,
  reducers: {
    addPlayer: (state, action: PayloadAction<Player>) => {
      state.all.push(action.payload);
    },
    removePlayer: (state, action: PayloadAction<string>) => {
      const index = state.all.findIndex(
        (player) => player.name === action.payload
      );
      if (index === -1) return;

      state.all.splice(index, 1);
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
    setShowDisciplines: (state, action: PayloadAction<boolean>) => {
      state.showDisciplines = action.payload;
    },
  },
});

export const {
  addPlayer,
  removePlayer,
  setLocalPlayer,
  overwritePlayers,
  setDiceRolling,
  setDiceValue,
  setShowDisciplines,
} = players.actions;
