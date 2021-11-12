import { secretGmCode } from "../client/constants";
import { RootState } from "../client/store";
import { Control } from "../client/types";

export const player = (state: RootState) =>
  state.players.all.find((player) => player.name === state.players.local);

const isGM = (state: RootState) => state.players.local === secretGmCode;

export const hasControls =
  (control: Control) =>
  (state: RootState): boolean => {
    if (isGM(state)) return true;

    const controls = player(state)?.controls;
    if (controls === undefined) return false;
    if (controls.includes(control)) return true;

    return false;
  };
