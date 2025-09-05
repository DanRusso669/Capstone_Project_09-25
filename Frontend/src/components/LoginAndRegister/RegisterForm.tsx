import { Button, Col, Form, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { registerFetch, setEmail, setName, setPassword, setPhoneNumber, setSurname } from "../../redux/actions/registerSlice";

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const formData = useAppSelector(state => state.register);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(registerFetch(formData));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} xs={12} sm={6} controlId="formGridName">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              autoComplete="off"
              required
              className="form-inputs"
              type="text"
              placeholder="Inserisci il nome"
              onChange={e => dispatch(setName(e.target.value))}
            />
          </Form.Group>

          <Form.Group as={Col} xs={12} sm={6} controlId="formGridSurname" className="mt-3 mt-sm-0">
            <Form.Label>Cognome</Form.Label>
            <Form.Control
              autoComplete="off"
              required
              className="form-inputs"
              type="text"
              placeholder="Inserisci il cognome"
              onChange={e => dispatch(setSurname(e.target.value))}
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoComplete="off"
            required
            className="form-inputs"
            type="email"
            placeholder="Inserisci email"
            onChange={e => dispatch(setEmail(e.target.value))}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridPassword">
          <Form.Label>Scegli una password</Form.Label>
          <Form.Control
            autoComplete="off"
            required
            className="form-inputs"
            type="password"
            placeholder="Scegli una password"
            onChange={e => dispatch(setPassword(e.target.value))}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridPhone">
          <Form.Label>Numero di Telefono</Form.Label>
          <Form.Control
            autoComplete="off"
            required
            className="form-inputs"
            placeholder="348123456"
            type="number"
            onChange={e => dispatch(setPhoneNumber(e.target.value))}
          />
        </Form.Group>

        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check
            required
            type="checkbox"
            label=" * Autorizzo il trattamento dei miei dati personali, ai sensi delle vigenti normative privacy (Regolamento Europeo n.679/16), secondo le finalità e le modalità indicate nella Vostra informativa."
          />
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button type="submit" variant="outline-none" className="monthly-form-btn">
            Registrati
          </Button>
        </div>
      </Form>
    </>
  );
};

export default RegisterForm;
