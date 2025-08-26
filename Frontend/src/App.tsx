import "./App.css";
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
    </>
  );
}

export default App;
