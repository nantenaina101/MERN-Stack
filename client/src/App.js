import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Add from "./components/AddStudent";
import Update from "./components/UpdateStudent";

function App() {
  return (
    <div className="App mt-4">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
