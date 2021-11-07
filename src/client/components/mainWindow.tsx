import { selectLocalPlayer } from "../../store/player";
import { useAppSelector } from "../../store/store";
import { Responsibility } from "../types";
import CharacterSheet from "./characterSheet";
import ControlPanel from "./controlPanel";
import Players from "./players";

const MainWindow: React.FC = () => {
  const player = useAppSelector(selectLocalPlayer);
  if (player === null) return null;

  const playerIsGM = player.responsibilities.includes(Responsibility.GM);

  return (
    <div style={{ display: "flex" }}>
      <CharacterSheet />
      <Players />
      {playerIsGM ? <ControlPanel /> : null}
    </div>
  );
};

export default MainWindow;
