import { Container, Image, Nav, Navbar } from "react-bootstrap";
import logo from "../assets/Logo-Rifugio-Mamo.jpg";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const MyNavbar = () => {
  const [scrolling, setScrolling] = useState(false);
  const location = useLocation();
  const isHomepage = location.pathname === "/";

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
    // TODO - Collegare i link alle rispettive pagine una volta create.
    <>
      <Navbar expand="lg" className={` ${isHomepage ? "fixed-top my-nav" : "sticky-top my-secondary-nav"} ${scrolling ? "scrolled-navbar" : ""}`}>
        <Container>
          <Link to={"/"} className="m-auto">
            <Image src={logo} className="logo d-lg-none ms-5" />
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link to={"/il-rifugio"} className="nav-link">
                Il Rifugio
              </Link>
              <Link to={"/cras"} className="nav-link">
                Il C.R.A.S.
              </Link>
              <Link to={"/news"} className="nav-link">
                News
              </Link>
              <Link to={"/blog"} className="nav-link">
                Blog
              </Link>
            </Nav>
            <Link to={"/"}>
              <Image src={logo} alt="logo" className="logo mx-5 d-none d-lg-block" />
            </Link>
            <Nav className="me-auto">
              <Link to={"/faq"} className="nav-link">
                FAQ
              </Link>
              <Link to={"/donazioni"} className="nav-link">
                Donazioni
              </Link>
              <Link to={"/volontariato"} className="nav-link">
                Volontariato
              </Link>
              <Link to={"/visite"} className="nav-link">
                Visite
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default MyNavbar;
