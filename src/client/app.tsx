import { useAppSelector, useAppDispatch, increment } from "../store/store";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.slice.count);

  const incrementCount = () => dispatch(increment());

  return (
    <>
      <div>{`The count is ${count}`}</div>
      <button onClick={incrementCount}>+</button>
    </>
  );
};

export default App;
