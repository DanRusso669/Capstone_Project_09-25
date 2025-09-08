import { Button, Col, Image, Nav, Navbar, Offcanvas } from "react-bootstrap";
import logo from "../../assets/Logo-Rifugio-Mamo.jpg";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";

const MyNavbar = () => {
  const [scrolling, setScrolling] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const location = useLocation();
  const isHomepage = location.pathname === "/";

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992 && showOffcanvas) {
        setShowOffcanvas(false);
      }
    };

    window.addEventListener("resize", handleResize);
  }, [showOffcanvas]);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  return (
    // TODO - Collegare i link alle rispettive pagine una volta create.
    <>
      <Navbar
        expand="lg"
        className={` ${isHomepage ? "fixed-top my-nav" : "sticky-top my-secondary-nav"} ${scrolling ? "scrolled-navbar" : ""} d-flex justify-content-center`}
      >
        <Link to={"/"} className="">
          <Image src={logo} className="logo d-lg-none" />
        </Link>
        <Button variant="outline-dark" onClick={handleShow} className="d-lg-none position-absolute end-0 me-3">
          ☰
        </Button>
        <Nav as={Col} lg={5} className="d-none d-lg-flex justify-content-end">
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
          <Link to={"/faq"} className="nav-link">
            FAQ
          </Link>
        </Nav>
        <Nav as={Col} lg={2} className="d-flex justify-content-center">
          <Link to={"/"}>
            <Image src={logo} alt="logo" className="logo mx-5 d-none d-lg-block" />
          </Link>
        </Nav>
        <Nav as={Col} lg={5} className="d-none d-lg-flex">
          <Link to={"/donazioni"} className="nav-link">
            Donazioni
          </Link>
          <Link to={"/volontariato"} className="nav-link">
            Volontariato
          </Link>
          <Link to={"/visite"} className="nav-link">
            Visite
          </Link>
          <Link to={"/accedi"} className="nav-link" onClick={handleClose}>
            Accedi
          </Link>
        </Nav>
      </Navbar>

      <Offcanvas show={showOffcanvas} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <Image src={logo} alt="logo" className="logo" />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Link to={"/il-rifugio"} className="nav-link" onClick={handleClose}>
              Il Rifugio
            </Link>
            <Link to={"/cras"} className="nav-link" onClick={handleClose}>
              Il C.R.A.S.
            </Link>
            <Link to={"/news"} className="nav-link" onClick={handleClose}>
              News
            </Link>
            <Link to={"/blog"} className="nav-link" onClick={handleClose}>
              Blog
            </Link>
            <Link to={"/faq"} className="nav-link" onClick={handleClose}>
              FAQ
            </Link>
            <Link to={"/donazioni"} className="nav-link" onClick={handleClose}>
              Donazioni
            </Link>
            <Link to={"/volontariato"} className="nav-link" onClick={handleClose}>
              Volontariato
            </Link>
            <Link to={"/visite"} className="nav-link" onClick={handleClose}>
              Visite
            </Link>
            <Link to={"/accedi"} className="nav-link" onClick={handleClose}>
              Accedi
            </Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default MyNavbar;
