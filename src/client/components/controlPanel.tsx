import { cycleResponsibilities } from "../controller";

const ControlPanel: React.FC = () => {
  return (
    <div>
      <h1>Control Panel</h1>
      <button onClick={cycleResponsibilities}>Cycle Responsibilities</button>
    </div>
  );
};

export default ControlPanel;
