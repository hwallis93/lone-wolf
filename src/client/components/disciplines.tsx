import { setShowDisciplines } from "../../store/player";
import { useAppDispatch, useAppSelector } from "../store";

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
        <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
          <Discipline name="Mindblast" description="blah blah" />
          <Discipline name="Mindblast" description="blah blah" />
          <Discipline name="Mindblast" description="blah blah" />
          <Discipline name="Mindblast" description="blah blah" />
        </div>
      ) : null}
    </div>
  );
};
export default Disciplines;

const Discipline: React.FC<{ name: string; description: string }> = ({
  name,
  description,
}) => {
  return (
    <span style={{ display: "flex", flexDirection: "column" }}>
      <strong>{name}</strong>
      <span>{description}</span>
    </span>
  );
};
