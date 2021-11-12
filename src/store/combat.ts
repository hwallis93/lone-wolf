import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Combat {
  enemyName: string;
  enemyCP: number;
  loneWolfCP: number;
  enemyEP: number;
}
type CombatState = Combat | null;
const initialState: CombatState | null = null;

export const combat = createSlice({
  name: "combat",
  initialState: initialState as CombatState,
  reducers: {
    setCombat: (_state, action: PayloadAction<Combat | null>) => {
      return action.payload;
    },
    setEnemyEP: (state, action: PayloadAction<Combat["enemyEP"]>) => {
      if (state === null) return;
      state.enemyEP = action.payload;
    },
  },
});

export const { setEnemyEP, setCombat } = combat.actions;
