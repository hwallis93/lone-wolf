import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Discipline, Player } from "../client/types";

interface LoneWolfState {
  gold: number;
  endurancePointsMax: number;
  endurancePoints: number;
  items: string[];
  disciplines: Discipline[];
}
const initialState: LoneWolfState = {
  gold: 12,
  endurancePointsMax: 23,
  endurancePoints: 23,
  items: ["Meal", "Meal", "Friggin potion", "Something else"],
  disciplines: [
    Discipline.CAMOUFLAGE,
    Discipline.HUNTING,
    Discipline.MINDSHIELD,
    Discipline.WEAPONSKILL,
    Discipline.SIXTH_SENSE,
  ],
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
