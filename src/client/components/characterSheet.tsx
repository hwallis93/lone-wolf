import {
  addDiscipline,
  addEndurancePoints,
  addGold,
  addSpecialItem,
  addToBackpack,
  addWeapon,
  removeDiscipline,
  removeFromBackpack,
  removeSpecialItem,
  removeWeapon,
} from "../../store/lonewolf";
import { secretGmCode } from "../constants";
import { useAppDispatch, useAppSelector } from "../store";
import { Control } from "../types";
import ItemList from "./itemList";

const CharacterSheet: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    gold,
    endurancePoints,
    endurancePointsMax,
    backpack,
    disciplines,
    weapons,
    specialItems,
  } = useAppSelector((state) => state.lonewolf);
  const isGM = useAppSelector((state) => state.players.local === secretGmCode);

  const player = useAppSelector((state) =>
    state.players.all.find((player) => player.name === state.players.local)
  );

  const diceControls = player?.controls.includes(Control.DICE) || isGM;
  const epControls =
    player?.controls.includes(Control.ENDURANCE_POINTS) || isGM;
  const goldControls = player?.controls.includes(Control.GOLD) || isGM;
  const backpackControls = player?.controls.includes(Control.BACKPACK) || isGM;
  const weaponsControls = player?.controls.includes(Control.WEAPONS) || isGM;

  return (
    <div style={{ flex: 1 }}>
      <h1>Character Sheet</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <span
            style={{ paddingRight: "10px" }}
          >{`Endurance Points (max. ${endurancePointsMax}): ${endurancePoints}`}</span>
          {epControls ? (
            <button onClick={() => dispatch(addEndurancePoints(1))}>+</button>
          ) : null}
          {epControls ? (
            <button onClick={() => dispatch(addEndurancePoints(-1))}>-</button>
          ) : null}
        </div>
        <div>
          <span
            style={{ paddingRight: "10px" }}
          >{`Gold (max. 50): ${gold}`}</span>
          {goldControls ? (
            <button onClick={() => dispatch(addGold(1))}>+</button>
          ) : null}
          {goldControls ? (
            <button onClick={() => dispatch(addGold(-1))}>-</button>
          ) : null}
        </div>
        <ItemList
          title={"Disciplines"}
          controls={isGM}
          items={disciplines}
          addCallback={(item) => dispatch(addDiscipline(item))}
          removeCallback={(item) => dispatch(removeDiscipline(item))}
        />
        <ItemList
          title={"Special Items"}
          controls={backpackControls}
          items={specialItems}
          addCallback={(item) => dispatch(addSpecialItem(item))}
          removeCallback={(item) => dispatch(removeSpecialItem(item))}
        />
        <ItemList
          title={"Backpack"}
          controls={backpackControls}
          maxLength={8}
          items={backpack}
          addCallback={(item) => dispatch(addToBackpack(item))}
          removeCallback={(item) => dispatch(removeFromBackpack(item))}
        />
        <ItemList
          title={"Weapons"}
          controls={weaponsControls}
          maxLength={2}
          items={weapons}
          addCallback={(weapon) => dispatch(addWeapon(weapon))}
          removeCallback={(weapon) => dispatch(removeWeapon(weapon))}
        />
      </div>
    </div>
  );
};

export default CharacterSheet;
