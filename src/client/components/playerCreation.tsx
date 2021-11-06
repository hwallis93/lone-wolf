import { ChangeEvent, KeyboardEvent, useState } from "react";
import { addPlayer, setLocalPlayer } from "../../store/player";
import { useAppDispatch } from "../../store/store";
import { Responsibility } from "../types";

const PlayerCreation: React.FC = () => {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState("");

  const change = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const submit = () => {
    const isSecretGMCode = input === "__henrythegm";

    if (isSecretGMCode) {
      dispatch(setLocalPlayer("Henry"));
      dispatch(
        addPlayer({ name: "Henry", responsibilities: [Responsibility.GM] })
      );
    } else {
      dispatch(setLocalPlayer(input));
      dispatch(addPlayer({ name: input, responsibilities: [] }));
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
