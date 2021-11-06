import { ChangeEvent, KeyboardEvent, useState } from "react";
import { addPlayer, setLocalPlayer } from "../../store/player";
import { useAppDispatch } from "../../store/store";

const PlayerCreation: React.FC = () => {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState("");

  const change = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const submit = () => {
    dispatch(setLocalPlayer(input));
    dispatch(addPlayer({ name: input, responsibilities: [] }));
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
