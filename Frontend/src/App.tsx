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
import AnimalPage from "./components/Animals/AnimalPage";
import AnimalDetailPage from "./components/Animals/AnimalDetailPage";
import BackOffice from "./components/BackOffice/BackOffice";
import AddAnimalPage from "./components/BackOffice/AddAnimalPage";
import UpdatePage from "./components/BackOffice/UpdatePage";
import ViewAllPage from "./components/BackOffice/ViewAllPage";
import AdoptionPage from "./components/Adoptions/AdoptionPage";
import Unauthorized from "./components/Unauthorized/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";
import type { ProfileResponse } from "./interfaces/User";
import { useEffect, useState } from "react";
import ArticlePage from "./components/Articles/ArticlePage";
import ArticleDetailPage from "./components/Articles/ArticleDetailPage";

function App() {
  const [user, setUser] = useState<ProfileResponse | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setIsLoadingUser(false);
  }, []);

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
          <Route path="/articoli" element={<ArticlePage />} />
          <Route path="/articoli/dettagli/:articleId" element={<ArticleDetailPage />} />
          <Route path="/i-nostri-animali" element={<AnimalPage />} />
          <Route path="/i-nostri-animali/dettagli/:animalId" element={<AnimalDetailPage />} />
          <Route path="/donazioni" element={<DonationPage />} />
          <Route path="/donazione-mensile" element={<MonthlyDonationPage />} />
          <Route path="/volontariato" element={<VolunteeringPage />} />
          <Route path="/visite" element={<VisitPage />} />
          <Route path="/accedi" element={<LoginPage setUser={setUser} />} />
          <Route path="/registrati" element={<RegisterPage />} />
          <Route path="/profilo" element={<Profile />} />
          <Route path="/profilo/adozioni" element={<AdoptionPage />} />

          {/* BACK OFFICE */}
          <Route path="/back-office" element={isLoadingUser ? null : <ProtectedRoute user={user} />}>
            <Route index element={<BackOffice />} />
            <Route path="visualizza/animali" element={<ViewAllPage />} />
            <Route path="aggiungi/animali" element={<AddAnimalPage />} />
            <Route path="modifica/animali/:animalId" element={<UpdatePage />} />
            <Route path="visualizza/adozioni" element={<ViewAllPage />} />
            <Route path="aggiungi/articoli" element={<AddAnimalPage />} />
            <Route path="modifica/articoli/:articleId" element={<UpdatePage />} />
          </Route>

          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
