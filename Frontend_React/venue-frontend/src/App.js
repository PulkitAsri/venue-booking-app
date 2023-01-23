import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import VenuePage from "./pages/venue/VenuePage";
import VenueList from "./pages/venueList/VenueList";
import LoginPage from "./pages/login/loginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:orgPk/venues" element={<VenueList />} />
        {/* <Route path="/venues" element={<VenueList />} /> */}
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/:orgPk/venues/:venuePk" element={<VenuePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
