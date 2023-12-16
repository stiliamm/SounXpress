import "./App.css";
import Navbar from "./components/Navbar";

function App({ children }) {
  return (
    <div className="App">
      <Navbar />
      <div className="children">{children}</div>
    </div>
  );
}

export default App;
