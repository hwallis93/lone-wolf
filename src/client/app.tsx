import { useAppSelector, useAppDispatch } from "../store/store";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const nameIsNotSet = useAppSelector((state) => state.players.local === null);

  // if (nameIsNotSet) {
  //   return <PlayerCreation/>
  // }
  return null;
};

export default App;
