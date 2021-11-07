import { useAppSelector } from "../../store/store";

const CharacterSheet: React.FC = () => {
  const { gold, endurancePoints, endurancePointsMax, items, disciplines } =
    useAppSelector((state) => state.lonewolf);

  return (
    <div style={{ paddingRight: "40px" }}>
      <h1>Character Sheet</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>{`Endurance Points (max. ${endurancePointsMax}): ${endurancePoints}`}</span>
        <span>{`Gold: ${gold}`}</span>
        Disciplines
        <ul>
          {disciplines.map((discipline) => (
            <li>{discipline}</li>
          ))}
        </ul>
        Items (max. 8)
        <ul>
          {items.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CharacterSheet;
