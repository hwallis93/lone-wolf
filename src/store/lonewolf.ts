import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Discipline, Weapon } from "../client/types";

interface LoneWolfState {
  disciplines: Discipline[];
  endurancePoints: number;
  endurancePointsMax: number;
  gold: number;
  items: string[];
  weapons: Weapon[];
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
  weapons: [Weapon.AXE, Weapon.SPEAR],
};

export const loneWolf = createSlice({
  name: "loneWolf",
  initialState,
  reducers: {
    overwriteLonewolf: (_state, action: PayloadAction<LoneWolfState>) => {
      return action.payload;
    },
  },
});

export const { overwriteLonewolf } = loneWolf.actions;
