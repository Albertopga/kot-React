import "./Assets/CSS/reset.css";
import "./Assets/CSS/App.css";
import "./Assets/CSS/styles.css";
import { PlayersContextWrapper } from "./Context/PlayersContext";
import { Router } from "./Routes/Router";

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
