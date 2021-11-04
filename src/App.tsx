import { useDispatch, useSelector } from "react-redux";
import { increment } from "./counterSlice";
import { RootState } from "./store";

const App = () => {
  const dispatch = useDispatch();

  const add4 = () => {
    dispatch(increment(4));
  };

  const num = useSelector<RootState>((state) => state.counter.value);

  return (
    <>
      <div>Hi</div>
      <button onClick={add4}>Add 4</button>
      <div>{`Num is ${num}`}</div>
    </>
  );
};

export default App;
