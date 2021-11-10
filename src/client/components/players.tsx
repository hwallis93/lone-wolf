import { useAppSelector } from "../store";
import { Player } from "../types";
import Combat from "./combat";
import Dice from "./dice";

const Players: React.FC = () => {
  const { local, all } = useAppSelector((state) => state.players);
  const gmName = useAppSelector((state) => state.gm.name);

  const playerDetails = (player: Player): string => {
    const name = player.name;
    const responsibilities =
      player.controls.length > 0 ? " (" + player.controls + ")" : "";
    const you = player.name === local ? " (You)" : "";

    return name + you + responsibilities;
  };

  const allPlayerDetails = all.map(playerDetails);
  if (gmName !== null) {
    allPlayerDetails.push(`${gmName} (GM)`);
  }
  allPlayerDetails.sort();

  return (
    <div>
      <h1>Players</h1>
      <ul>
        {allPlayerDetails.map((player) => (
          <li>{player}</li>
        ))}
      </ul>
      <Dice />
      <Combat />
    </div>
  );
};

export default Players;
