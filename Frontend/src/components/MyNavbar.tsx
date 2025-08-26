import { Container, Image, Nav, Navbar } from "react-bootstrap";
import logo from "../assets/Logo-Rifugio-Mamo.jpg";

const MyNavbar = () => {
  return (
    // TODO - Collegare i link alle rispettive pagine una volta create.
    <>
      <Navbar expand="lg" className="py-3 my-nav">
        <Container>
          <Image src={logo} className="logo d-lg-none m-auto" />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home">Il Rifugio</Nav.Link>
              <Nav.Link href="#link">Il C.R.A.S.</Nav.Link>
              <Nav.Link href="#link">News</Nav.Link>
              <Nav.Link href="#link">Blog</Nav.Link>
            </Nav>
            <Image src={logo} alt="logo" className="logo mx-5 d-none d-lg-block" />
            <Nav className="me-auto">
              <Nav.Link href="#link">FAQ</Nav.Link>
              <Nav.Link href="#link">Donazioni</Nav.Link>
              <Nav.Link href="#link">Volontariato</Nav.Link>
              <Nav.Link href="#link">Visite</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default MyNavbar;
