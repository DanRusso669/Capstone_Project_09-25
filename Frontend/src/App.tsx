import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Homepage from "./components/Homepage";
import ShelterPage from "./components/ShelterPage";
import MyNavbar from "./components/MyNavbar";
import CrasPage from "./components/CrasPage";
import VolunteeringPage from "./components/VolunteeringPage";
import DonationPage from "./components/DonationPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNavbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/il-rifugio" element={<ShelterPage />} />
          <Route path="/cras" element={<CrasPage />} />
          <Route path="/donazioni" element={<DonationPage />} />
          <Route path="/volontariato" element={<VolunteeringPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
