import zip from "lodash.zip";
import { ChangeEvent, useState } from "react";
import { setEnemyEP, setCombat } from "../../store/combat";
import { addEndurancePoints } from "../../store/lonewolf";
import { hasControls } from "../../store/selectors";
import { useAppDispatch, useAppSelector } from "../store";
import { Control } from "../types";

import "./combat.css";

const Combat: React.FC = () => {
  const combatIsActive = useAppSelector((state) => state.combat !== null);
  const controls = useAppSelector(hasControls(Control.COMBAT));

  if (combatIsActive) return <CombatTracker />;
  if (controls) return <CombatCreator />;
  return null;
};
export default Combat;

const CombatTracker: React.FC = () => {
  const dispatch = useAppDispatch();
  const combat = useAppSelector((state) => state.combat);
  const loneWolfEP = useAppSelector((state) => state.lonewolf.endurancePoints);
  const controls = useAppSelector(hasControls(Control.COMBAT));
  if (combat === null) return null;

  const decreaseEnemyEP = () => dispatch(setEnemyEP(combat.enemyEP - 1));
  const increaseEnemyEP = () => dispatch(setEnemyEP(combat.enemyEP + 1));
  const decreaseLoneWolfEP = () => dispatch(addEndurancePoints(-1));
  const increaseLoneWolfEP = () => dispatch(addEndurancePoints(+1));

  let CPDiff = combat.loneWolfCP - combat.enemyCP;
  if (CPDiff < -11) CPDiff = -11;
  if (CPDiff > 11) CPDiff = 11;

  return (
    <div className="CombatTracker">
      <h2>💥 Combat</h2>
      <div className="CombatTracker__CombatTable" role="table">
        <span />
        <strong>{combat.enemyName}</strong>
        <strong>🐺 Lone Wolf</strong>
        <strong>🤺 CS</strong>
        <span>{combat.enemyCP}</span>
        <span>{combat.loneWolfCP}</span>
        <strong>🩸 EP</strong>
        <span className="CombatTracker__CombatTable__Controls">
          {controls ? (
            <button
              className="primary"
              onClick={increaseEnemyEP}
            >+</button>
          ) : (
            <button
              className="primary"
              disabled
            >+</button>
          )}
          <p>{combat.enemyEP}</p>
          {controls ? (
            <button
              className="primary"
              onClick={decreaseEnemyEP}
            >-</button>
          ) : (
            <button
              className="primary"
              disabled
            >-</button>
          )}
        </span>
        <span className="CombatTracker__CombatTable__Controls">
          {controls ? (
            <button
              className="primary"
              onClick={increaseLoneWolfEP}
            >+</button>
          ) : (
            <button
              className="primary"
              disabled
            >+</button>
          )}
          <p>{loneWolfEP}</p>
          {controls ? (
            <button
              className="primary"
              onClick={decreaseLoneWolfEP}
            >-</button>
          ) : (
            <button
              className="primary"
              disabled
            >-</button>
          )}
        </span>
      </div>
      <h3>Damage Table</h3>
      <DamageTable CPDiff={CPDiff} />
      {controls ? (
        <button
          className="primary"
          onClick={() => dispatch(setCombat(null))}
        >
          End Combat
        </button>
      ) : null}
    </div>
  );
};

const DamageTable: React.FC<{ CPDiff: number }> = ({ CPDiff }) => {
  const calcDamageTable = () => {
    let loneWolfDamage: (number | "💀")[] = [];
    let enemyDamage: (number | "💀")[] = [];
    switch (CPDiff) {
      case -11:
        loneWolfDamage = [0, "💀", "💀", 8, 8, 7, 6, 5, 4, 3];
        enemyDamage = [6, 0, 0, 0, 0, 1, 2, 3, 4, 5];
        break;
      case -10:
      case -9:
        loneWolfDamage = [0, "💀", 8, 7, 7, 6, 6, 5, 4, 3];
        enemyDamage = [7, 0, 0, 0, 1, 2, 3, 4, 5, 6];
        break;
      case -8:
      case -7:
        loneWolfDamage = [0, 8, 7, 6, 6, 5, 5, 4, 3, 2];
        enemyDamage = [8, 0, 0, 1, 2, 3, 4, 5, 6, 7];
        break;
      case -6:
      case -5:
        loneWolfDamage = [0, 6, 6, 5, 5, 4, 4, 3, 2, 0];
        enemyDamage = [9, 0, 1, 2, 3, 4, 5, 6, 7, 8];
        break;
      case -4:
      case -3:
        loneWolfDamage = [0, 6, 5, 5, 4, 4, 3, 2, 1, 0];
        enemyDamage = [10, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        break;
      case -2:
      case -1:
        loneWolfDamage = [0, 5, 5, 4, 4, 3, 2, 2, 1, 0];
        enemyDamage = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        break;
      case 0:
        loneWolfDamage = [0, 5, 4, 4, 3, 2, 2, 1, 0, 0];
        enemyDamage = [12, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        break;
      case 1:
      case 2:
        loneWolfDamage = [0, 5, 4, 3, 3, 2, 2, 1, 0, 0];
        enemyDamage = [14, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        break;
      case 3:
      case 4:
        loneWolfDamage = [0, 4, 3, 3, 2, 2, 2, 1, 0, 0];
        enemyDamage = [16, 5, 6, 7, 8, 9, 10, 11, 12, 14];
        break;
      case 5:
      case 6:
        loneWolfDamage = [0, 4, 3, 3, 2, 2, 1, 0, 0, 0];
        enemyDamage = [18, 6, 7, 8, 9, 10, 11, 12, 14, 16];
        break;
      case 7:
      case 8:
        loneWolfDamage = [0, 4, 3, 2, 2, 2, 1, 0, 0, 0];
        enemyDamage = ["💀", 7, 8, 9, 10, 11, 12, 14, 16, 18];
        break;
      case 9:
      case 10:
        loneWolfDamage = [0, 3, 3, 2, 2, 2, 1, 0, 0, 0];
        enemyDamage = ["💀", 8, 9, 10, 11, 12, 14, 16, 18, "💀"];
        break;
      case 11:
        loneWolfDamage = [0, 3, 2, 2, 2, 1, 1, 0, 0, 0];
        enemyDamage = ["💀", 9, 10, 11, 12, 14, 16, 18, "💀", "💀"];
        break;
    }
    return zip(loneWolfDamage, enemyDamage);
  };
  const damageTable = calcDamageTable();

  return (
    <div className="DamageTable" role="table">
      <span>Dice Roll</span>
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>4</span>
      <span>5</span>
      <span>6</span>
      <span>7</span>
      <span>8</span>
      <span>9</span>
      <span>0</span>
      <span>Lone Wolf Damage</span>
      <span>{damageTable[1][0]}</span>
      <span>{damageTable[2][0]}</span>
      <span>{damageTable[3][0]}</span>
      <span>{damageTable[4][0]}</span>
      <span>{damageTable[5][0]}</span>
      <span>{damageTable[6][0]}</span>
      <span>{damageTable[7][0]}</span>
      <span>{damageTable[8][0]}</span>
      <span>{damageTable[9][0]}</span>
      <span>{damageTable[0][0]}</span>
      <span>Enemy Damage</span>
      <span>{damageTable[1][1]}</span>
      <span>{damageTable[2][1]}</span>
      <span>{damageTable[3][1]}</span>
      <span>{damageTable[4][1]}</span>
      <span>{damageTable[5][1]}</span>
      <span>{damageTable[6][1]}</span>
      <span>{damageTable[7][1]}</span>
      <span>{damageTable[8][1]}</span>
      <span>{damageTable[9][1]}</span>
      <span>{damageTable[0][1]}</span>
    </div>
  );
};

interface Field {
  value?: number|string;
  error?: string;
}

const CombatCreator: React.FC = () => {
  const dispatch = useAppDispatch();

  const [enemyNameField, setEnemyNameField] = useState<Field>({ value: "", error: "" });
  const [enemyEPField, setEnemyEPField] = useState<Field>({ value: "", error: "" });
  const [enemyCPField, setEnemyCPField] = useState<Field>({ value: "", error: "" });
  const [loneWolfCPField, setLoneWolfCPField] = useState<Field>({ value: "", error: "" });


  const onEnemyNameChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;

    if (!value.trim()) {
      setEnemyNameField({ value, error: "Enemy name can't be blank" });
      return;
    }

    setEnemyNameField({ value, error: "" });
  }

  const onNumberChange = (setFn: React.Dispatch<React.SetStateAction<Field>>):
    React.ChangeEventHandler<HTMLInputElement> => (event) => {
    const value = event.target.value;

    const valueAsNumber = parseInt(value, 10);
    if (isNaN(valueAsNumber)) {
      setFn({
        value: value,
        error: "Value must be a number"
      });
      return;
    }

    if (valueAsNumber <= 0) {
      setFn({
        value: valueAsNumber,
        error: "Value must be greater than 0"
      });
      return;
    }

    setFn({
      value: valueAsNumber,
      error: ""
    });
  }

  const createCombat: React.FormEventHandler = (event) => {
    event.preventDefault();

    dispatch(
      setCombat({
        enemyName: enemyNameField.value as string,
        enemyCP: enemyCPField.value as number,
        enemyEP: enemyEPField.value as number,
        loneWolfCP: loneWolfCPField.value as number,
      })
    );
  };

  return (
    <form className="CombatCreator" onSubmit={createCombat}>
      <h2>Combat Creator</h2>
      <label>
        👾 Enemy name:
        <input
          className={enemyNameField.error ? "invalid" : ""}
          type="text"
          required
          value={enemyNameField.value}
          onChange={onEnemyNameChange}
          placeholder="Enter the enemy name value"
        />
        {enemyNameField.error && (<p className="inputError">{enemyNameField.error}</p>)}
      </label>
      <label>
        🩸 Enemy Endurance Points:
        <input
          className={enemyEPField.error ? "invalid" : ""}
          type="text"
          pattern="[1-9][0-9]*"
          required
          value={enemyEPField.value}
          onChange={onNumberChange(setEnemyEPField)}
          placeholder="Enter the enemy EP value"
        />
        {enemyEPField.error && (<p className="inputError">{enemyEPField.error}</p>)}
      </label>
      <label>
        🤺 Enemy Combat Skill:
        <input
          className={enemyCPField.error ? "invalid" : ""}
          type="text"
          pattern="[1-9][0-9]*"
          required
          value={enemyCPField.value}
          onChange={onNumberChange(setEnemyCPField)}
          placeholder="Enter the enemy CS value"
        />
        {enemyCPField.error && (<p className="inputError">{enemyCPField.error}</p>)}
      </label>
      <label>
        🐺 Lone Wolf Combat Skill:
        <input
          className={loneWolfCPField.error ? "invalid" : ""}
          type="text"
          pattern="[1-9][0-9]*"
          required
          value={loneWolfCPField.value}
          onChange={onNumberChange(setLoneWolfCPField)}
          placeholder="Enter your current CS value"
        />
        {loneWolfCPField.error && (<p className="inputError">{loneWolfCPField.error}</p>)}
      </label>
      <button className="primary" type="submit">
        Start combat
      </button>
    </form>
  );
};
