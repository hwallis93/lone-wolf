import { useAppSelector } from "../store";
import { Player } from "../types";
import Combat from "./combat";
import Dice from "./dice";
import Disciplines from "./disciplines";

import "./players.css";

const Players: React.FC = () => {
  const { local, all } = useAppSelector((state) => state.players);
  const gmName = useAppSelector((state) => state.gm.name);

  const playerDetails = (player: Player): string => {
    const name = player.name;
    let controls = "";
    if (player.controls.length > 0) {
      controls += " (";
      player.controls.forEach((control) => {
        controls += `${control}, `;
      });
      controls = controls.slice(0, controls.length - 2);
      controls += ")";
    }

    const you = player.name === local ? " (You)" : "";

    return name + you + controls;
  };

  const allPlayerDetails = all.map(playerDetails);
  if (gmName !== null) {
    allPlayerDetails.push(`${gmName} (GM)`);
  }
  allPlayerDetails.sort();

  return (
    <section className="Players">
      <h2>Players</h2>
      <ul role="list" className="Players__items">
        {allPlayerDetails.map((player) => (
          <li>{player}</li>
        ))}
      </ul>
      <Dice />
      <Combat />
      <Disciplines />
    </section>
  );
};

export default Players;
