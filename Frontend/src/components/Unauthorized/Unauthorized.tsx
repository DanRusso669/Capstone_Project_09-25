import { Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./unauthorized.css";
import unauthorized from "../../assets/401-Error-Unauthorized.svg";

const Unauthorized = () => {
  return (
    <Container id="unauthorized-section" className="text-center navbar-height d-flex flex-column justify-content-center align-items-center">
      <h1 className="titles">Accesso Negato</h1>
      <p className="fst-italic">Non hai i permessi per accedere a questa pagina.</p>
      <Image src={unauthorized} fluid />
      <a href="https://storyset.com/web">Web illustrations by Storyset</a>
      <Link to={"/"} className="mt-4">
        Torna alla Homepage
      </Link>
    </Container>
  );
};

export default Unauthorized;
