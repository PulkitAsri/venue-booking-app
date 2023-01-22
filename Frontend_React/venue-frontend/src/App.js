import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import LoginPage from "./pages/login/loginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:orgPk/venues" element={<List />} />
        {/* <Route path="/venues" element={<List />} /> */}
        <Route path="/loginPage" element={<LoginPage/>} />
        <Route path="/:orgPk/venues/:venuePk" element={<Hotel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
