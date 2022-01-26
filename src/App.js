import { useSelector } from "react-redux";
import Info from "./components/Info";
import Morphemes from "./components/Morphemes";
import Results from "./components/Results";
import Word from "./components/Word";

function App() {
  const progress = useSelector((state) => state.progressReducer);

  if (progress.finish) {
    return <Results />
  }

  return (
    <div className="App">
      <Info />
      <Word />
      <Morphemes />
    </div>
  );
}

export default App;
