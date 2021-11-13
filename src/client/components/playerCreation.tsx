import { ChangeEvent, KeyboardEvent, useState } from "react";
import { setGmName } from "../../store/gm";
import { addPlayer, setLocalPlayer } from "../../store/player";
import { useAppDispatch } from "../store";
import { secretGmCode } from "../constants";

const PlayerCreation: React.FC = () => {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState("");

  const change = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const submit = () => {
    dispatch(setLocalPlayer(input));

    if (input === secretGmCode) {
      dispatch(setGmName("Henry"));
    } else {
      dispatch(addPlayer({ name: input, controls: [] }));
    }
  };
  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") submit();
  };

  return (
    <div>
      <div>Welcome to Lone Wolf. Who are you?</div>
      <input
        value={input}
        onChange={change}
        onKeyPress={handleKeyPress}
      ></input>
    </div>
  );
};

export default PlayerCreation;
