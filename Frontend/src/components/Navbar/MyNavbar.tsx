import { Button, Col, Dropdown, Image, Nav, Navbar, Offcanvas } from "react-bootstrap";
import logo from "../../assets/Logo-Rifugio-Mamo.jpg";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navbar.css";
import { ArrowRightShort } from "react-bootstrap-icons";

const MyNavbar = () => {
  const [scrolling, setScrolling] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomepage = location.pathname === "/";

  const handleShowOffcanvas = () => {
    setShowOffcanvas(!showOffcanvas);
    if (!showOffcanvas) setShowProfile(false);
  };
  const handleShowProfile = () => setShowProfile(!showProfile);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992 && showOffcanvas) {
        handleShowOffcanvas();
      }
    };

    window.addEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showOffcanvas]);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setShowOffcanvas(false);
  };

  return (
    // TODO - Collegare i link alle rispettive pagine una volta create.
    <>
      <Navbar
        expand="lg"
        className={` ${isHomepage ? "fixed-top my-nav" : "sticky-top my-secondary-nav"} ${scrolling ? "scrolled-navbar" : ""} d-flex justify-content-center`}
      >
        <Link to={"/"}>
          <Image src={logo} className="logo d-lg-none" />
        </Link>
        <Button variant="outline-dark" onClick={handleShowOffcanvas} className="d-lg-none position-absolute end-0 me-3">
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
          {localStorage.getItem("accessToken") ? (
            <Dropdown>
              <Dropdown.Toggle className="nav-link" id="dropdown-basic">
                Profilo
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate("/profilo")} className="profile-links">
                  <ArrowRightShort className="mb-1" />I tuoi dati
                </Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/profilo/adozioni")} className="profile-links">
                  <ArrowRightShort className="mb-1" />
                  Le tue adozioni
                </Dropdown.Item>
                <Dropdown.Item href="/" onClick={handleLogout} className="profile-links">
                  <ArrowRightShort className="mb-1" />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Link to={"/accedi"} className="nav-link">
              Accedi
            </Link>
          )}
        </Nav>
      </Navbar>

      <Offcanvas show={showOffcanvas} onHide={handleShowOffcanvas} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <Link to={"/"}>
              <Image src={logo} alt="logo" className="logo" onClick={handleShowOffcanvas} />
            </Link>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Link to={"/il-rifugio"} className="nav-link" onClick={handleShowOffcanvas}>
              Il Rifugio
            </Link>
            <Link to={"/cras"} className="nav-link" onClick={handleShowOffcanvas}>
              Il C.R.A.S.
            </Link>
            <Link to={"/news"} className="nav-link" onClick={handleShowOffcanvas}>
              News
            </Link>
            <Link to={"/blog"} className="nav-link" onClick={handleShowOffcanvas}>
              Blog
            </Link>
            <Link to={"/faq"} className="nav-link" onClick={handleShowOffcanvas}>
              FAQ
            </Link>
            <Link to={"/donazioni"} className="nav-link" onClick={handleShowOffcanvas}>
              Donazioni
            </Link>
            <Link to={"/volontariato"} className="nav-link" onClick={handleShowOffcanvas}>
              Volontariato
            </Link>
            <Link to={"/visite"} className="nav-link" onClick={handleShowOffcanvas}>
              Visite
            </Link>
            {localStorage.getItem("accessToken") ? (
              <div className="nav-link prova" onClick={handleShowProfile}>
                Profilo
                {showProfile && (
                  <div className="d-flex flex-column mt-2 ps-3 profile-links-wrapper">
                    <Link to="/profilo" className="nav-link profile-links" onClick={handleShowOffcanvas}>
                      <ArrowRightShort className="mb-1" />I tuoi dati
                    </Link>
                    <Link to="/profilo/adozioni" className="nav-link profile-links" onClick={handleShowOffcanvas}>
                      <ArrowRightShort className="mb-1" />
                      Le tue adozioni
                    </Link>
                    <Link to="/" className="nav-link profile-links" onClick={handleLogout}>
                      <ArrowRightShort className="mb-1" />
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <Link to={"/accedi"} className="nav-link" onClick={handleShowOffcanvas}>
                Accedi
              </Link>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default MyNavbar;
