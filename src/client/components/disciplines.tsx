import { setShowDisciplines } from "../../store/player";
import { disciplines } from "../constants";
import { useAppDispatch, useAppSelector } from "../store";
import { Discipline as iDiscipline } from "../types";

const Disciplines: React.FC = () => {
  const dispatch = useAppDispatch();
  const showDisciplines = useAppSelector(
    (state) => state.players.showDisciplines
  );

  const buttonText = showDisciplines ? "Hide" : "Show";
  const toggleShowDisciplines = () =>
    dispatch(setShowDisciplines(!showDisciplines));

  return (
    <div>
      <h2>Disciplines</h2>
      <button onClick={toggleShowDisciplines}>{buttonText}</button>
      {showDisciplines ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto",
            gap: "10px",
          }}
        >
          <Discipline discipline={disciplines.animalKinship} />
          <Discipline discipline={disciplines.camouflage} />
          <Discipline discipline={disciplines.healing} />
          <Discipline discipline={disciplines.hunting} />
          <Discipline discipline={disciplines.mindOverMatter} />
          <Discipline discipline={disciplines.mindblast} />
          <Discipline discipline={disciplines.mindshield} />
          <Discipline discipline={disciplines.sixthSense} />
          <Discipline discipline={disciplines.tracking} />
          <Discipline discipline={disciplines.weaponskill} />
        </div>
      ) : null}
    </div>
  );
};
export default Disciplines;

const Discipline: React.FC<{ discipline: iDiscipline }> = (props) => {
  const { name, tldr, description } = props.discipline;
  return (
    <span style={{ display: "flex", flexDirection: "column" }}>
      <strong>{name}</strong>
      <em>{tldr}</em>
      <span>{description}</span>
    </span>
  );
};
