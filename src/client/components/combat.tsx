import { ChangeEvent, useState } from "react";
import { useAppSelector } from "../store";

const Combat: React.FC = () => {
  const combatIsActive = useAppSelector((state) => state.combat !== null);

  if (combatIsActive) return <CombatTracker />;
  else return <CombatCreator />;
};
export default Combat;

const CombatTracker: React.FC = () => {
  return <div>2</div>;
};
const CombatCreator: React.FC = () => {
  const [enemyNameField, setEnemyNameField] = useState("");
  const [enemyEPMaxField, setEnemyEPMaxField] = useState("");
  const [enemyCPField, setEnemyCPField] = useState("");
  const [loneWolfCPField, setLoneWolfCPField] = useState("");

  const [errors, setErrors] = useState<string[]>([]);

  const createCombat = () => {
    const errs: string[] = [];
    if (enemyNameField.trim() === "") errs.push("Enemy name can't be blank");

    const enemyEPAsNumber = parseInt(enemyEPMaxField);
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
      console.log("Valid!");
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
        value={enemyEPMaxField}
        onChange={(event) => setEnemyEPMaxField(event.target.value)}
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
