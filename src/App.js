import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DisplayTask } from "./component/DisplayTask";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<DisplayTask />} path={"/"} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
