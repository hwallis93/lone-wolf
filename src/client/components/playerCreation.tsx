import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { setGmName } from "../../store/gm";
import { addPlayer, setLocalPlayer } from "../../store/player";
import { useAppDispatch } from "../store";
import { secretGmCode } from "../constants";

import "./playerCreation.css";

const PlayerCreation: React.FC = () => {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState("");
  const inputRef: React.Ref<HTMLInputElement> = useRef(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [inputRef]);

  const change = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const submit: React.FormEventHandler = (event) => {
    event.preventDefault();

    dispatch(setLocalPlayer(input));

    if (input === secretGmCode) {
      dispatch(setGmName("Henry"));
    } else {
      dispatch(addPlayer({ name: input, controls: [] }));
    }
  };

  return (
    <form className="PlayerCreation" onSubmit={submit}>
      <h1>🐺 Lone Wolf</h1>
      <p>Welcome to <strong>Lone Wolf</strong> Game.</p>
      <label>
        Who are you?
        <input
          id="name"
          required
          type="text"
          ref={inputRef}
          placeholder="Enter your name"
          value={input}
          onChange={change}
        />
      </label>
      <button type="submit">
        Join
      </button>
    </form>
  );
};

export default PlayerCreation;
