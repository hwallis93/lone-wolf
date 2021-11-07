import { useAppSelector } from "../../store/store";
import { Player } from "../types";

const Players: React.FC = () => {
  const { local, all } = useAppSelector((state) => state.players);

  const playerDetails = (player: Player): string => {
    const name = player.name;
    const responsibilities =
      player.responsibilities.length > 0
        ? " (" + player.responsibilities + ")"
        : "";
    const you = player.name === local ? " (You)" : "";

    return name + you + responsibilities;
  };

  return (
    <div>
      <h1>Players</h1>
      <ul>
        {all.map((player) => (
          <li>{playerDetails(player)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Players;
