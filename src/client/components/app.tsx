import { useAppSelector } from "../../store/store";
import PlayerCreation from "./playerCreation";

const App: React.FC = () => {
  const nameIsNotSet = useAppSelector((state) => state.players.local === null);

  if (nameIsNotSet) {
    return <PlayerCreation />;
  }
  return null;
};

export default App;
