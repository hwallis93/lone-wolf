import { useEffect, useState } from "react";
import { setDiceRolling, setDiceValue } from "../../store/player";
import { secretGmCode } from "../constants";
import { useAppDispatch, useAppSelector } from "../store";
import { Control } from "../types";

const Dice: React.FC = () => {
  const dispatch = useAppDispatch();
  const { diceRolling } = useAppSelector((state) => state.players);

  const player = useAppSelector((state) =>
    state.players.all.find((player) => player.name === state.players.local)
  );

  const isGM = useAppSelector((state) => state.players.local === secretGmCode);
  const diceControls = player?.controls.includes(Control.DICE) || isGM;

  const square = diceRolling ? <Rolling /> : <Stationary />;

  const rollTheDice = () => {
    dispatch(setDiceRolling(true));
    const result = Math.floor(Math.random() * 10);
    dispatch(setDiceValue(result));
    setTimeout(() => dispatch(setDiceRolling(false)), 1500);
  };

  return (
    <div>
      <h2>Dice</h2>
      {square}
      {diceControls ? (
        <button onClick={rollTheDice}>Roll the dice!</button>
      ) : null}
    </div>
  );
};

export default Dice;

const Rolling: React.FC = () => {
  const [value, setValue] = useState(Math.floor(Math.random() * 10));

  useEffect(() => {
    const interval = setInterval(() => {
      const newValue = Math.floor(Math.random() * 10);
      setValue(newValue);
    }, 100);

    return () => clearInterval(interval);
  });

  return (
    <div
      style={{
        width: "40px",
        height: "40px",
        border: "2px solid black",
        fontSize: "30px",
        textAlign: "center",
      }}
    >
      {value}
    </div>
  );
};
const Stationary: React.FC = () => {
  const { diceValue } = useAppSelector((state) => state.players);

  return (
    <div
      style={{
        width: "40px",
        height: "40px",
        border: "2px solid black",
        fontSize: "30px",
        textAlign: "center",
      }}
    >
      {diceValue}
    </div>
  );
};
