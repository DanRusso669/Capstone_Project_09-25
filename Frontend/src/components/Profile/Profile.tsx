import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./profile.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { profileFetch, setEmail, setName, setPassword, setPhoneNumber, setSurname } from "../../redux/actions/profileSlice";
import MyVerticalModal from "./MyVerticalModal";

const Profile = () => {
  // const [isVerifying, setIsVeryfing] = useState(false);
  // const [authenticated, setAuthenticated] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useAppDispatch();
  const {
    data: { name, surname, email, phoneNumber, password },
    passwordCheckResult,
  } = useAppSelector(state => state.profile);

  const handleUpdate = () => {
    console.log("Aggiornamento completato.");
  };

  useEffect(() => {
    dispatch(profileFetch());
  }, []);

  useEffect(() => {
    if (passwordCheckResult) setModalShow(false);
  }, [passwordCheckResult]);

  return (
    <>
      <Container className="profile-container navbar-height d-flex flex-column justify-content-start align-items-start information">
        <h1 className="titles mx-auto mb-2 mt-4">Il tuo profilo</h1>
        <h4 className="subtitles mx-auto mt-3 mb-2">I tuoi dati</h4>
        <Form className="mx-auto w-75">
          <Row className="mb-3">
            <Form.Group as={Col} xs={12} md={6} className="mb-3" controlId="formGridName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                value={name}
                autoComplete="off"
                className="form-inputs"
                type="text"
                placeholder="Inserisci il nome"
                readOnly={!passwordCheckResult}
                {...(passwordCheckResult && {
                  onChange: e => {
                    dispatch(setName(e.target.value));
                  },
                })}
              />
            </Form.Group>

            <Form.Group as={Col} xs={12} md={6} controlId="formGridSurname">
              <Form.Label>Cognome</Form.Label>
              <Form.Control
                value={surname}
                autoComplete="off"
                className="form-inputs"
                type="text"
                placeholder="Inserisci il cognome"
                readOnly={!passwordCheckResult}
                {...(passwordCheckResult && {
                  onChange: e => {
                    dispatch(setSurname(e.target.value));
                  },
                })}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md={6} className="mb-3" controlId="formGridEmail">
              <Form.Label>La tua email</Form.Label>
              <Form.Control
                value={email}
                autoComplete="off"
                className="form-inputs"
                type="email"
                placeholder="Inserisci email"
                readOnly={!passwordCheckResult}
                {...(passwordCheckResult && {
                  onChange: e => {
                    dispatch(setEmail(e.target.value));
                  },
                })}
              />
            </Form.Group>

            <Form.Group as={Col} md={6} className="mb-3 mx-auto" controlId="formGridPhone">
              <Form.Label>Il tuo numero di telefono</Form.Label>
              <Form.Control
                value={phoneNumber}
                autoComplete="off"
                className="form-inputs"
                placeholder="348123456"
                type="number"
                readOnly={!passwordCheckResult}
                {...(passwordCheckResult && {
                  onChange: e => {
                    dispatch(setPhoneNumber(e.target.value));
                  },
                })}
              />
            </Form.Group>

            {passwordCheckResult && (
              <>
                <Form.Group as={Col} md={6} className="mb-3" controlId="formGridPassword">
                  <Form.Label>La tua password</Form.Label>
                  <Form.Control
                    value={password}
                    autoComplete="off"
                    className="form-inputs"
                    type="password"
                    placeholder="Scegli una password"
                    onChange={e => {
                      dispatch(setPassword(e.target.value));
                    }}
                  />
                </Form.Group>
              </>
            )}
          </Row>
          <div className="d-flex justify-content-center">
            <Button
              variant="outline-none"
              className="monthly-form-btn mb-4"
              {...(passwordCheckResult ? { onClick: () => handleUpdate() } : { onClick: () => setModalShow(true) })}
            >
              {passwordCheckResult ? "Salva i nuovi dati" : "Modifica i tuoi dati"}
            </Button>
          </div>
        </Form>
        <h4 className="subtitles mx-auto mt-3 mb-2">Le tue donazioni mensili</h4>
        <h4 className="subtitles mx-auto mt-3 mb-2">Le tue adozioni</h4>
      </Container>
      <MyVerticalModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default Profile;
