import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConditionalKeys } from "type-fest";

interface Combat {
  enemyName: string;
  enemyEPMax: number;
  enemyEP: number;
  enemyCP: number;
  loneWolfCP: number;
  round: number;
}
type CombatState = Combat | null;
const initialState: CombatState | null = null;

const numberSetter =
  (field: ConditionalKeys<Combat, number>) =>
  (state: CombatState, action: PayloadAction<number>) => {
    if (state === null) return;
    state[field] = action.payload;
  };

export const combat = createSlice({
  name: "combat",
  initialState: initialState as CombatState,
  reducers: {
    setEnemyName: (state, action: PayloadAction<string>) => {
      if (state === null) return;
      state.enemyName = action.payload;
    },
    setEnemyEPMax: numberSetter("enemyEPMax"),
    setEnemyEP: numberSetter("enemyEP"),
    setEnemyCP: numberSetter("enemyCP"),
    setLoneWolfCP: numberSetter("loneWolfCP"),
    setRound: numberSetter("round"),
  },
});

export const {
  setEnemyName,
  setEnemyEPMax,
  setEnemyEP,
  setEnemyCP,
  setLoneWolfCP,
  setRound,
} = combat.actions;
