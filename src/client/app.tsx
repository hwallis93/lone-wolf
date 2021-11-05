import { sendMessage } from "./websocket-client";

const App: React.FC = () => {
  sendMessage("Hello sever I'm client");
  return <div>Hello websocket</div>;
};

export default App;
