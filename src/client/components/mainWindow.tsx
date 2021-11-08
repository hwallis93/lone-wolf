import { useAppSelector } from "../store";
import { secretGmCode } from "../constants";
import CharacterSheet from "./characterSheet";
import ControlPanel from "./controlPanel";
import Players from "./players";

const MainWindow: React.FC = () => {
  const playerIsGM = useAppSelector(
    (state) => state.players.local === secretGmCode
  );

  return (
    <div style={{ display: "flex", gap: "50px" }}>
      <CharacterSheet />
      <Players />
      {playerIsGM ? <ControlPanel /> : null}
    </div>
  );
};

export default MainWindow;
