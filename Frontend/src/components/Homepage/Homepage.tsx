import { useEffect, useState } from "react";
import Hero from "./Hero";
import MainSection from "./MainSection";
import "./homepage.css";

const Homepage = () => {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  return (
    <>
      <div id="bg-nav-hero">
        <Hero />
        <svg
          className={`down-arrow ${scrolling ? "down-arrow-vanish" : ""}`}
          fill="rgb(255, 115, 0)"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="83px"
          height="83px"
          viewBox="-3.07 -3.07 36.87 36.87"
          xmlSpace="preserve"
          stroke="black"
          transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"
          stroke-width="1"
          strokeOpacity={0.5}
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.49163199999999996"></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g>
              {" "}
              <path d="M29.994,10.183L15.363,24.812L0.733,10.184c-0.977-0.978-0.977-2.561,0-3.536c0.977-0.977,2.559-0.976,3.536,0 l11.095,11.093L26.461,6.647c0.977-0.976,2.559-0.976,3.535,0C30.971,7.624,30.971,9.206,29.994,10.183z"></path>{" "}
            </g>{" "}
          </g>
        </svg>
      </div>
      <MainSection />
    </>
  );
};

export default Homepage;
