import "./App.css";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import MainSection from "./components/MainSection";
import MyNavbar from "./components/MyNavbar";

function App() {
  return (
    <>
      <div id="bg-nav-hero">
        <MyNavbar />
        <Hero />
      </div>
      <MainSection />
      <Footer />
    </>
  );
}

export default App;
