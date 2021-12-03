import { ChangeEvent, KeyboardEvent, useState } from "react";
import { cycleResponsibilities } from "../controller";
import JSON5 from "json5";
import { RootState, useAppDispatch, useAppSelector } from "../store";
import { setAllPlayers } from "../../store/player";
import { overwriteGm } from "../../store/gm";
import {
  addEndurancePoints,
  overwriteLonewolf,
  reset,
  setEPMax,
} from "../../store/lonewolf";
import { setCombat } from "../../store/combat";
import DownloadLink from "react-download-link";

import "./controlPanel.css";

const ControlPanel: React.FC = () => {
  const [overwriteInput, setOverwriteInput] = useState("");
  const [EPMaxInput, setEPMaxInput] = useState("");
  const dispatch = useAppDispatch();
  const allState = useAppSelector((state) => state);

  const change = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setOverwriteInput(event.target.value);
  };

  const overwriteRedux = () => {
    const asJson = JSON5.parse(overwriteInput) as RootState;
    dispatch(setAllPlayers(asJson.players.all));
    dispatch(overwriteGm(asJson.gm));
    dispatch(overwriteLonewolf(asJson.lonewolf));
    dispatch(setCombat(asJson.combat));
  };

  const resetCharacterSheet = () => {
    dispatch(reset());
  };

  const submitEPMax = () => {
    const num = parseInt(EPMaxInput);
    dispatch(setEPMax(num));
    dispatch(addEndurancePoints(num));
    setEPMaxInput("");
  };
  const handleEPMaxKepPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") submitEPMax();
  };

  return (
    <div className="ControlPanel">
      <h1>Control Panel</h1>

      <button className="primary" onClick={cycleResponsibilities}>
        Cycle Responsibilities
      </button>

      <hr />

      <label>
        Overwrite Redux
        <textarea
          value={overwriteInput}
          onChange={change}
          placeholder="Paste the JSON here to override redux state"
        />
      </label>

      <button className="primary" onClick={overwriteRedux}>Overwrite Redux</button>

      <hr />

      <label>
        Set EP Max:
        <input
          value={EPMaxInput}
          onChange={(event) => setEPMaxInput(event.target.value)}
          onKeyPress={handleEPMaxKepPress}
          placeholder="Set maximum value for lone wolf EP"
        />
      </label>
      <button className="primary" onClick={submitEPMax}>Change EP Max</button>

      <hr />

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
