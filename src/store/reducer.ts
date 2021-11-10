import { combat } from "./combat";
import { gm } from "./gm";
import { loneWolf } from "./lonewolf";
import { players } from "./player";

export default {
  lonewolf: loneWolf.reducer,
  players: players.reducer,
  gm: gm.reducer,
  combat: combat.reducer,
};
