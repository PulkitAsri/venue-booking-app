import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:orgPk" element={<span>HEHEHEHE</span>} />
        <Route path="/venues" element={<List />} />
        <Route path="/venues/:id" element={<Hotel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
