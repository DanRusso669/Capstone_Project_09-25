import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Homepage from "./components/Homepage/Homepage";
import ShelterPage from "./components/Shelter/ShelterPage";
import MyNavbar from "./components/Navbar/MyNavbar";
import CrasPage from "./components/CRAS/CrasPage";
import VolunteeringPage from "./components/Volunteering/VolunteeringPage";
import DonationPage from "./components/Donation/DonationPage";
import MonthlyDonationPage from "./components/Donation/MonthlyDonationPage";
import ScrollToTop from "./components/ScrollToTop";
import VisitPage from "./components/Visit/VisitPage";
import LoginPage from "./components/LoginAndRegister/LoginPage";
import RegisterPage from "./components/LoginAndRegister/RegisterPage";
import { ToastContainer } from "react-toastify";
import Profile from "./components/Profile/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
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
          <Route path="/accedi" element={<LoginPage />} />
          <Route path="/registrati" element={<RegisterPage />} />
          <Route path="/profilo" element={<Profile />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
