import "./Assets/CSS/reset.css";
import "./Assets/CSS/App.css";
import "./Assets/CSS/styles.css";
import Router from "./Routes/Router";
import { PlayersContextWrapper } from "./Context/PlayersContext";

function App() {
  return (
    <div className="App">
      <PlayersContextWrapper>
        <Router />
      </PlayersContextWrapper>
    </div>
  );
}

export default App;
