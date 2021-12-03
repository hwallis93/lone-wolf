import { setShowDisciplines } from "../../store/player";
import { disciplines } from "../constants";
import { useAppDispatch, useAppSelector } from "../store";
import { Discipline as iDiscipline } from "../types";

import "./disciplines.css";
import Modal from "./modal";

const Disciplines: React.FC = () => {
  const dispatch = useAppDispatch();
  const showDisciplines = useAppSelector(
    (state) => state.players.showDisciplines
  );

  const buttonText = showDisciplines ? "Hide" : "Show";
  const toggleShowDisciplines = () =>
    dispatch(setShowDisciplines(!showDisciplines));

  return (
    <div className="Disciplines">
      <h2>Disciplines</h2>
      <button className="primary" onClick={toggleShowDisciplines}>{buttonText}</button>
      {showDisciplines ? (
        <Modal title="Disciplines" onClose={toggleShowDisciplines}>
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
        </Modal>
      ) : null}
    </div>
  );
};
export default Disciplines;

const Discipline: React.FC<{ discipline: iDiscipline }> = (props) => {
  const { name, tldr, description } = props.discipline;
  return (
    <div className="Discipline">
      <h3>📚 {name}</h3>
      <em>({tldr})</em>
      <p>{description}</p>
    </div>
  );
};
