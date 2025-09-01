import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Homepage from "./components/Homepage";
import ShelterPage from "./components/ShelterPage";
import MyNavbar from "./components/MyNavbar";
import CrasPage from "./components/CrasPage";
import VolunteeringPage from "./components/VolunteeringPage";
import DonationPage from "./components/DonationPage";
import MonthlyDonationPage from "./components/MonthlyDonationPage";
import ScrollToTop from "./components/ScrollToTop";
import VisitPage from "./components/VisitPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <MyNavbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/il-rifugio" element={<ShelterPage />} />
          <Route path="/cras" element={<CrasPage />} />
          <Route path="/donazioni" element={<DonationPage />} />
          <Route path="/donazione-mensile" element={<MonthlyDonationPage />} />
          <Route path="/volontariato" element={<VolunteeringPage />} />
          <Route path="/visite" element={<VisitPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
