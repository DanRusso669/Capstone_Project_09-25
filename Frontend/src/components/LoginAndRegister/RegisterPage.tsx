import { Container } from "react-bootstrap";
import RegisterForm from "./RegisterForm";
import "./registerPage.css";

const RegisterPage = () => {
  return (
    <>
      <Container className="navbar-height d-flex flex-column justify-content-center align-items-center information mb-4">
        <h1 className="titles mb-2 mt-4">Registrazione</h1>
        <p className="mb-4">Registrati per sbloccare la possibilità di donare, adottare un animale a distanza e tanto altro.</p>
        <RegisterForm />
      </Container>
    </>
  );
};

export default RegisterPage;
