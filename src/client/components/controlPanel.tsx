import { ChangeEvent, KeyboardEvent, useState } from "react";
import { cycleResponsibilities } from "../controller";
import JSON5 from "json5";
import { RootState, useAppDispatch } from "../../store/store";
import { overwritePlayers } from "../../store/player";
import { overwriteGm } from "../../store/gm";
import { overwriteLonewolf } from "../../store/lonewolf";

const ControlPanel: React.FC = () => {
  const [input, setInput] = useState("");
  const dispatch = useAppDispatch();

  const change = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const overwriteRedux = () => {
    const asJson = JSON5.parse(input) as RootState;
    dispatch(overwritePlayers(asJson.players.all));
    dispatch(overwriteGm(asJson.gm));
    dispatch(overwriteLonewolf(asJson.lonewolf));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <h1>Control Panel</h1>
      <button onClick={cycleResponsibilities}>Cycle Responsibilities</button>
      <div>
        <textarea value={input} onChange={change}></textarea>
        <button onClick={overwriteRedux}>Overwrite Redux</button>
      </div>
    </div>
  );
};

export default ControlPanel;