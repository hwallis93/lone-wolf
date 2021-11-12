import zip from "lodash.zip";
import { ChangeEvent, useState } from "react";
import { setEnemyEP, setCombat } from "../../store/combat";
import { addEndurancePoints } from "../../store/lonewolf";
import { hasControls } from "../../store/selectors";
import { useAppDispatch, useAppSelector } from "../store";
import { Control } from "../types";

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

  const CPDiff = combat.loneWolfCP - combat.enemyCP;

  return (
    <>
      <h2 style={{ textAlign: "center", color: "red" }}>COMBAT</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto",
          gap: "4px",
        }}
      >
        <span />
        <strong>{combat.enemyName}</strong>
        <strong>Lone Wolf</strong>
        <span>Combat Points</span>
        <span>{combat.enemyCP}</span>
        <span>{combat.loneWolfCP}</span>
        <span>Endurance Points</span>
        <span style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
          {combat.enemyEP}
          {controls ? (
            <>
              <button onClick={increaseEnemyEP}>+</button>
              <button onClick={decreaseEnemyEP}>-</button>
            </>
          ) : null}
        </span>
        <span style={{ display: "flex", flexDirection: "column" }}>
          {loneWolfEP}
          {controls ? (
            <>
              <button onClick={increaseLoneWolfEP}>+</button>
              <button onClick={decreaseLoneWolfEP}>-</button>
            </>
          ) : null}
        </span>
      </div>
      Damage Table
      <DamageTable CPDiff={CPDiff} />
      {controls ? (
        <button
          style={{ marginTop: "10px" }}
          onClick={() => dispatch(setCombat(null))}
        >
          End Combat
        </button>
      ) : null}
    </>
  );
};

const DamageTable: React.FC<{ CPDiff: number }> = ({ CPDiff }) => {
  const calcDamageTable = () => {
    switch (CPDiff) {
      case 2:
        const loneWolfDamage = [0, 7, 6, 5, 4, 4, 3, 2, 1, 0];
        const enemyDamage = [12, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        return zip(loneWolfDamage, enemyDamage);
    }
  };
  const damageTable = calcDamageTable();
  if (damageTable === undefined) return null;

  const cell: React.CSSProperties = {
    borderTop: "1px solid black",
    borderLeft: "1px solid black",
    textAlign: "center",
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto repeat(10, 25px)",
        borderBottom: "1px solid black",
        borderRight: "1px solid black",
        paddingTop: "20px",
      }}
    >
      <span style={cell}>Dice Roll</span>
      <span style={cell}>1</span>
      <span style={cell}>2</span>
      <span style={cell}>3</span>
      <span style={cell}>4</span>
      <span style={cell}>5</span>
      <span style={cell}>6</span>
      <span style={cell}>7</span>
      <span style={cell}>8</span>
      <span style={cell}>9</span>
      <span style={cell}>0</span>
      <span style={cell}>Lone Wolf Damage</span>
      <span style={cell}>{damageTable[1][0]}</span>
      <span style={cell}>{damageTable[2][0]}</span>
      <span style={cell}>{damageTable[3][0]}</span>
      <span style={cell}>{damageTable[4][0]}</span>
      <span style={cell}>{damageTable[5][0]}</span>
      <span style={cell}>{damageTable[6][0]}</span>
      <span style={cell}>{damageTable[7][0]}</span>
      <span style={cell}>{damageTable[8][0]}</span>
      <span style={cell}>{damageTable[9][0]}</span>
      <span style={cell}>{damageTable[0][0]}</span>
      <span style={cell}>Enemy Damage</span>
      <span style={cell}>{damageTable[1][1]}</span>
      <span style={cell}>{damageTable[2][1]}</span>
      <span style={cell}>{damageTable[3][1]}</span>
      <span style={cell}>{damageTable[4][1]}</span>
      <span style={cell}>{damageTable[5][1]}</span>
      <span style={cell}>{damageTable[6][1]}</span>
      <span style={cell}>{damageTable[7][1]}</span>
      <span style={cell}>{damageTable[8][1]}</span>
      <span style={cell}>{damageTable[9][1]}</span>
      <span style={cell}>{damageTable[0][1]}</span>
    </div>
  );
};

const CombatCreator: React.FC = () => {
  const dispatch = useAppDispatch();
  const [enemyNameField, setEnemyNameField] = useState("");
  const [enemyEPField, setEnemyEPField] = useState("");
  const [enemyCPField, setEnemyCPField] = useState("");
  const [loneWolfCPField, setLoneWolfCPField] = useState("");

  const [errors, setErrors] = useState<string[]>([]);

  const createCombat = () => {
    const errs: string[] = [];
    if (enemyNameField.trim() === "") errs.push("Enemy name can't be blank");

    const enemyEPAsNumber = parseInt(enemyEPField);
    if (isNaN(enemyEPAsNumber))
      errs.push("Enemy Endurance Points must be a number");
    if (enemyEPAsNumber <= 0)
      errs.push("Enemy Endurance Points must be greater than 0");

    const enemyCPAsNumber = parseInt(enemyCPField);
    if (isNaN(enemyCPAsNumber))
      errs.push("Enemy Combat Points must be a number");
    if (enemyCPAsNumber <= 0)
      errs.push("Enemy Combat Points must be greater than 0");

    const loneWolfCPAsNumber = parseInt(loneWolfCPField);
    if (isNaN(loneWolfCPAsNumber))
      errs.push("Lone Wolf Combat Points must be a number");
    if (loneWolfCPAsNumber <= 0)
      errs.push("Lone Wolf Combat Points must be greater than 0");

    if (errs.length) {
      setErrors(errs);
    } else {
      dispatch(
        setCombat({
          enemyName: enemyNameField,
          enemyCP: enemyCPAsNumber,
          enemyEP: enemyEPAsNumber,
          loneWolfCP: loneWolfCPAsNumber,
        })
      );
      setErrors([]);
    }
  };
  return (
    <span style={{ display: "flex", flexDirection: "column" }}>
      <h2>Combat Creator</h2>
      Enemy name:
      <input
        value={enemyNameField}
        onChange={(event) => setEnemyNameField(event.target.value)}
      />
      Enemy Endurance Points:
      <input
        value={enemyEPField}
        onChange={(event) => setEnemyEPField(event.target.value)}
      />
      Enemy Combat Points:
      <input
        value={enemyCPField}
        onChange={(event) => setEnemyCPField(event.target.value)}
      />
      Lone Wolf Combat Points:
      <input
        value={loneWolfCPField}
        onChange={(event) => setLoneWolfCPField(event.target.value)}
      />
      <button onClick={createCombat}>Start combat</button>
      {errors.length > 0 ? errors.map((error) => <div>{error}</div>) : null}
    </span>
  );
};
