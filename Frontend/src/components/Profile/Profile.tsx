import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./profile.css";
import { useState } from "react";

const Profile = () => {
  const [isModifying, setIsModifying] = useState(false);

  return (
    <>
      <Container className="profile-container navbar-height d-flex flex-column justify-content-start align-items-start information">
        <h1 className="titles mx-auto mb-2 mt-4">Il tuo profilo</h1>
        <h4 className="subtitles mx-auto mt-3 mb-2">I tuoi dati</h4>
        <Form className="mx-auto w-75">
          <Row className="mb-3">
            <Form.Group as={Col} xs={12} md={6} className="mb-3" controlId="formGridName">
              <Form.Label>Nome</Form.Label>
              <Form.Control value={"nome"} autoComplete="off" className="form-inputs" type="text" placeholder="Inserisci il nome" readOnly={!isModifying} />
            </Form.Group>

            <Form.Group as={Col} xs={12} md={6} controlId="formGridSurname">
              <Form.Label>Cognome</Form.Label>
              <Form.Control
                value={"surname"}
                autoComplete="off"
                className="form-inputs"
                type="text"
                placeholder="Inserisci il cognome"
                readOnly={!isModifying}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md={6} className="mb-3" controlId="formGridEmail">
              <Form.Label>La tua email</Form.Label>
              <Form.Control value={"email"} autoComplete="off" className="form-inputs" type="email" placeholder="Inserisci email" readOnly={!isModifying} />
            </Form.Group>

            <Form.Group as={Col} md={6} className="mb-3" controlId="formGridPassword">
              <Form.Label>La tua password</Form.Label>
              <Form.Control
                value={"password"}
                autoComplete="off"
                className="form-inputs"
                type="password"
                placeholder="Scegli una password"
                readOnly={!isModifying}
              />
            </Form.Group>

            <Form.Group as={Col} md={6} className="mb-3 mx-auto" controlId="formGridPhone">
              <Form.Label>Il tuo numero di telefono</Form.Label>
              <Form.Control value={"phoneNumber"} autoComplete="off" className="form-inputs" placeholder="348123456" type="number" readOnly={!isModifying} />
            </Form.Group>
          </Row>
          <div className="d-flex justify-content-center">
            <Button variant="outline-none" className="monthly-form-btn mb-4">
              Modifica i tuoi dati
            </Button>
          </div>
        </Form>
        <h4 className="subtitles mx-auto mt-3 mb-2">Le tue donazioni mensili</h4>
        <h4 className="subtitles mx-auto mt-3 mb-2">Le tue adozioni</h4>
      </Container>
    </>
  );
};

export default Profile;
