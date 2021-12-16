import { useAppSelector } from "../store";
import { secretGmCode } from "../constants";
import CharacterSheet from "./characterSheet";
import ControlPanel from "./controlPanel";
import Players from "./players";

import "./mainWindow.css";

const MainWindow: React.FC = () => {
  const playerIsGM = useAppSelector(
    (state) => state.players.local === secretGmCode
  );

  return (
    <section className="MainWindow">
      <CharacterSheet />
      <Players />
      {playerIsGM ? <ControlPanel /> : null}
    </section>
  );
};

export default MainWindow;
