import { Button, Col, Form, Row } from "react-bootstrap";

const RegisterForm = () => {
  return (
    <>
      {/* TODO - Completare il form (provincia, comune) e collegarlo alla creazione di un sostenitore nel DB */}
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} xs={12} sm={6} controlId="formGridName">
            <Form.Label>Nome</Form.Label>
            <Form.Control autoComplete="off" required className="form-inputs" type="text" placeholder="Inserisci il nome" />
          </Form.Group>

          <Form.Group as={Col} xs={12} sm={6} controlId="formGridSurname" className="mt-3 mt-sm-0">
            <Form.Label>Cognome</Form.Label>
            <Form.Control autoComplete="off" required className="form-inputs" type="text" placeholder="Inserisci il cognome" />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control autoComplete="off" required className="form-inputs" type="email" placeholder="Inserisci email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridPassword">
          <Form.Label>Scegli una password</Form.Label>
          <Form.Control autoComplete="off" required className="form-inputs" type="password" placeholder="Scegli una password" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridPhone">
          <Form.Label>Numero di Telefono</Form.Label>
          <Form.Control autoComplete="off" required className="form-inputs" placeholder="348123456" type="number" />
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

// <Row className="mb-3">
//   <Form.Group as={Col} xs={12} sm={2} controlId="formGridAmount">
//     <Form.Label>Importo</Form.Label>
//     <Form.Select defaultValue="Choose...">
//       <option value={5}>5 €</option>
//       <option value={10}>10 €</option>
//       <option value={20}>20 €</option>
//       <option value={25}>25 €</option>
//       <option value={30}>30 €</option>
//       <option value={50}>50 €</option>
//       <option value={75}>75 €</option>
//       <option value={100}>100 €</option>
//     </Form.Select>
//   </Form.Group>
//   <Form.Group as={Col} xs={12} sm={10} className="mt-3 mt-sm-0">
//     <Form.Label>Preferenze</Form.Label>
//     <Form.Control placeholder="Inserisci in cosa preferisci che venga usata la donazione" type="text" />
//   </Form.Group>
// </Row>
