import Hero from "./homepageComponents/Hero";
import MainSection from "./homepageComponents/MainSection";

const Homepage = () => {
  return (
    <>
      <div id="bg-nav-hero">
        <Hero />
      </div>
      <MainSection />
    </>
  );
};

export default Homepage;
