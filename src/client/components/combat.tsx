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

  const enemyNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEnemyNameField(event.target.value);
  };
  const enemyEPMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEnemyEPMaxField(event.target.value);
  };

  const createCombat = () => {
    const errs: string[] = [];
    if (enemyNameField.trim() === "") errs.push("Enemy name can't be blank");

    const enemyEPAsNumber = parseInt(enemyEPMaxField);
    if (isNaN(enemyEPAsNumber)) errs.push("Enemy EP must be a number");
    if (enemyEPAsNumber <= 0) errs.push("Enemy EP must be greater than 0");

    if (errs.length) {
      setErrors(errs);
    } else {
      console.log("Valid!");
      setErrors([]);
    }
  };
  return (
    <>
      <form>
        <h2>Combat Creator</h2>
        Enemy name:
        <input value={enemyNameField} onChange={enemyNameChange} />
        Enemy EP:
        <input value={enemyEPMaxField} onChange={enemyEPMaxChange} />
      </form>
      <button onClick={createCombat}>Start combat</button>
      {errors.length > 0 ? <div>{errors}</div> : null}
    </>
  );
};
