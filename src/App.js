import fluree from "./Dark Stacked.png";
import DinoTable from "./components/DinoTable";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={fluree} className="fluree-logo" alt="fluree-logo" />
      </header>
      <div>
        <DinoTable />
      </div>
    </div>
  );
}

export default App;
