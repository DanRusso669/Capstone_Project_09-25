import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Homepage from "./components/Homepage";
import ShelterPage from "./components/ShelterPage";
import MyNavbar from "./components/MyNavbar";
import Cras from "./components/Cras";

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNavbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/il-rifugio" element={<ShelterPage />} />
          <Route path="/cras" element={<Cras />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
