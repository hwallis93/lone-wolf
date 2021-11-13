import { ChangeEvent, KeyboardEvent, useState } from "react";
import { cycleResponsibilities } from "../controller";
import JSON5 from "json5";
import { RootState, useAppDispatch, useAppSelector } from "../store";
import { overwritePlayers } from "../../store/player";
import { overwriteGm } from "../../store/gm";
import { overwriteLonewolf, reset } from "../../store/lonewolf";
import { setCombat } from "../../store/combat";
import DownloadLink from "react-download-link";

const ControlPanel: React.FC = () => {
  const [input, setInput] = useState("");
  const dispatch = useAppDispatch();
  const allState = useAppSelector((state) => state);

  const change = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const overwriteRedux = () => {
    const asJson = JSON5.parse(input) as RootState;
    dispatch(overwritePlayers(asJson.players.all));
    dispatch(overwriteGm(asJson.gm));
    dispatch(overwriteLonewolf(asJson.lonewolf));
    dispatch(setCombat(asJson.combat));
  };

  const resetCharacterSheet = () => {
    dispatch(reset());
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <h1>Control Panel</h1>
      <button onClick={cycleResponsibilities}>Cycle Responsibilities</button>
      <div>
        <textarea value={input} onChange={change}></textarea>
        <button onClick={overwriteRedux}>Overwrite Redux</button>
      </div>
      <button onClick={resetCharacterSheet}>Reset Character Sheet</button>
      <DownloadLink
        label="Save"
        filename="loneWolf.json"
        exportFile={() => JSON.stringify(allState)}
      />
    </div>
  );
};

export default ControlPanel;
