import { useAppSelector } from "../../store/store";
import MainWindow from "./mainWindow";
import PlayerCreation from "./playerCreation";

const App: React.FC = () => {
  const nameIsNotSet = useAppSelector((state) => state.players.local === null);

  if (nameIsNotSet) {
    return <PlayerCreation />;
  }
  return <MainWindow />;
};

export default App;
