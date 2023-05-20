import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import VenuePage from "./pages/venue/VenuePage";
import VenueList from "./pages/venueList/VenueList";
import SignUp from "./pages/login/signup";
import Login from "./pages/login/newLoginPage";
import React from "react";
import { userContext } from "./contexts/userContext";

function App() {
  return (
    <userContext.Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:orgPk/venues" element={<VenueList />} />
          {/* <Route path="/venues" element={<VenueList />} /> */}
          <Route path="/newLoginPage" element={<Login />} />
          <Route path="/signUpPage" element={<SignUp />} />
          <Route path="/:orgPk/venues/:venuePk" element={<VenuePage />} />
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
