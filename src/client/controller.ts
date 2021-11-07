import { overwritePlayers } from "../store/player";
import { store } from "../store/store";
import { Player, Responsibility } from "./types";
import cloneDeep from "lodash.clonedeep";

export const cycleResponsibilities = () => {
  const players = store.getState().players.all;
  const newResps = reCalculateResponsibilities(players);

  store.dispatch(overwritePlayers(newResps));
};

const reCalculateResponsibilities = (unsortedPlayers: Player[]) => {
  const players = cloneDeep(unsortedPlayers).sort((a, b) =>
    a.name < b.name ? -1 : 1
  );
  const resps = Object.values(Responsibility).sort();

  // Take the sorted players, slice and conact so that the player with the second responsibility is
  // at the front of the queue to receive responsibilites. This means they'll get the first
  // responsibility this time, then the last next time (or none if there aren't enough)
  let playerWithSecondResp = players.findIndex((player) =>
    player.responsibilities.includes(resps[1])
  );
  if (playerWithSecondResp === -1) playerWithSecondResp = 0;
  const before = players.slice(0, playerWithSecondResp);
  const after = players.slice(playerWithSecondResp);
  const newPlayerOrder = after.concat(before);

  // Clear out old responsibilites before adding new ones
  newPlayerOrder.forEach((player) => (player.responsibilities = []));

  // Add responsibilites, cycling back to the start if there are more responsibilites than players
  resps.forEach((resp, index) => {
    newPlayerOrder[index % players.length].responsibilities.push(resp);
  });

  return players;
};
