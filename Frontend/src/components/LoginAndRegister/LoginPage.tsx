import { Container, Form } from "react-bootstrap";
import "./loginPage.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <>
      <Container className="login-section navbar-height d-flex flex-column justify-content-start align-items-center information">
        <h1 className="mb-4 mt-4">Accedi al tuo account</h1>
        <div className="login-form-wrapper d-flex justify-content-center align-items-center">
          <Form className="login-form">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="ms-1">Indirizzo Email</Form.Label>
              <Form.Control type="email" placeholder="Inserisci la tua email" />
              <Form.Text className="ms-1">Non condivideremo la tua email con nessuno.</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="ms-1">Password</Form.Label>
              <Form.Control type="password" placeholder="Inserisci la tua password" />
              <Form.Text className="ms-1">
                Non ricordi la password ?{" "}
                <Link to={"/password-dimenticata"} className="cras-links">
                  Clicca qui.
                </Link>
              </Form.Text>
            </Form.Group>

            <Link to={"/"} className="login-btn text-center" type="submit">
              Accedi
            </Link>
            <div className="text-center mt-3">
              <p>
                Prima volta qui ?{" "}
                <Link to={"/registrati"} className="cras-links">
                  Registrati!
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default LoginPage;
