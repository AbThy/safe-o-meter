import "./App.css";
import { Map } from "./component/Map";

function App() {
  return (
    <div className="App">
      <Map />
      <div style={{ height: window.innerHeight }}>
        <p>Other page area</p>
      </div>
    </div>
  );
}

export default App;
