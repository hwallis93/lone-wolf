import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Discipline, Player } from "../client/types";

interface LoneWolfState {
  gold: number;
  endurancePoints: number;
  items: string[];
  disciplines: Discipline[];
}
const initialState: LoneWolfState = {
  gold: 0,
  endurancePoints: 0,
  items: [],
  disciplines: [],
};

export const loneWolf = createSlice({
  name: "loneWolf",
  initialState,
  reducers: {},
});

export const {} = loneWolf.actions;
// export const selectLocalPlayer = (state: { players: PlayersState }) =>
//   state.players.players.find((player) => player.name === state.players.local) ||
//   null;
