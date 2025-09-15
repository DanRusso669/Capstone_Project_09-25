import { Button, Col, Container, Form, Row } from "react-bootstrap";

// type FormFields = {
//   name: string;
//   age: number;
//   gender: string;
//   species: string;
//   breed: string;
//   description: string;
//   clinicalCondition: string;
//   status: string;
//   city: string;
//   province: string;
//   region: string;
//   userEmail: string;
//   userName: string;
//   userSurname: string;
//   userPhoneNumber: string;
//   imageUrl?: string;
// };

const AddAnimalPage = () => {
  return (
    <>
      <Container id="add-animal-section" className="navbar-height d-flex flex-column justify-content-start align-items-start information mb-4">
        <h2 className="titles mx-auto mb-2 mt-4">Animali</h2>
        <h4 className="subtitles mx-auto">Aggiungi un animale</h4>
        <Form className="w-100 ">
          <Row>
            <Form.Group as={Col} xs={12} sm={6} lg={4} controlId="formGridName" className="mt-3">
              <Form.Label className="fst-italic fw-semibold">Nome</Form.Label>
              <Form.Control autoComplete="off" className="form-inputs" type="text" placeholder="Inserisci il nome dell'animale" />
            </Form.Group>

            <Form.Group as={Col} xs={12} sm={6} lg={4} controlId="formGridAge" className="mt-3">
              <Form.Label className="fst-italic fw-semibold">Età</Form.Label>
              <Form.Control autoComplete="off" className="form-inputs" type="number" placeholder="Inserisci l'età dell'animale" />
            </Form.Group>

            <Form.Group as={Col} xs={12} sm={6} lg={4} controlId="formGridImgUrl" className="mt-3">
              <Form.Label className="fst-italic fw-semibold">Immagine</Form.Label>
              <Form.Control autoComplete="off" className="form-inputs" type="text" placeholder="Inserisci un'immagine dell'animale" />
            </Form.Group>

            <Form.Group as={Col} xs={12} sm={6} lg={4} controlId="formGridSpecies" className="mt-3">
              <Form.Label className="fst-italic fw-semibold">Specie</Form.Label>
              <Form.Control autoComplete="off" className="form-inputs" type="text" placeholder="Inserisci la specie dell'animale" />
            </Form.Group>

            <Form.Group as={Col} xs={12} sm={6} lg={4} controlId="formGridBreed" className="mt-3">
              <Form.Label className="fst-italic fw-semibold">Razza</Form.Label>
              <Form.Control autoComplete="off" className="form-inputs" type="number" placeholder="Inserisci la razza dell'animale" />
            </Form.Group>

            <Form.Group as={Col} xs={12} sm={6} lg={4} controlId="formGridGender" className="mt-3">
              <Form.Label className="fst-italic fw-semibold">Sesso</Form.Label>
              <Form.Select className="border border-dark">
                <option value={"MALE"}>Maschio</option>
                <option value={"FEMALE"}>Femmina</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} xs={12} sm={6} lg={4} controlId="formGridCity" className="mt-3">
              <Form.Label className="fst-italic fw-semibold">Città</Form.Label>
              <Form.Control autoComplete="off" className="form-inputs" type="text" placeholder="Inserisci la città in cui è stato trovato l'animale" />
            </Form.Group>

            <Form.Group as={Col} xs={12} sm={6} lg={4} controlId="formGridProvince" className="mt-3">
              <Form.Label className="fst-italic fw-semibold">Provincia</Form.Label>
              <Form.Control autoComplete="off" className="form-inputs" type="text" placeholder="Inserisci la provincia in cui è stato trovato l'animale" />
            </Form.Group>

            <Form.Group as={Col} xs={12} sm={6} lg={4} controlId="formGridRegion" className="mt-3">
              <Form.Label className="fst-italic fw-semibold">Regione</Form.Label>
              <Form.Control autoComplete="off" className="form-inputs" type="text" placeholder="Inserisci la regione in cui è stato trovato l'animale" />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} xs={12} sm={6} controlId="formGridDescription" className="mt-3">
              <Form.Label className="fst-italic fw-semibold">Descrizione</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                autoComplete="off"
                className="form-inputs"
                type="text"
                placeholder="Inserisci una descrizione dell'animale"
              />
            </Form.Group>

            <Form.Group as={Col} xs={12} sm={6} controlId="formGridClinicalCondition" className="mt-3">
              <Form.Label className="fst-italic fw-semibold">Condizione Clinica</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                autoComplete="off"
                className="form-inputs"
                type="text"
                placeholder="Inserisci la situazione clinica dell'animale"
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} xs={12} sm={6} controlId="formGridName" className="mt-3">
              <Form.Label className="fst-italic fw-semibold">Nome</Form.Label>
              <Form.Control autoComplete="off" className="form-inputs" type="text" placeholder="Inserisci il nome di chi ha ritrovato l'animale" />
            </Form.Group>

            <Form.Group as={Col} xs={12} sm={6} controlId="formGridSurname" className="mt-3">
              <Form.Label className="fst-italic fw-semibold">Cognome</Form.Label>
              <Form.Control autoComplete="off" className="form-inputs" type="text" placeholder="Inserisci il cognome di chi ha ritrovato l'animale" />
            </Form.Group>

            <Form.Group as={Col} xs={12} sm={6} controlId="formGridEmail" className="mt-3">
              <Form.Label className="fst-italic fw-semibold">Email</Form.Label>
              <Form.Control autoComplete="off" className="form-inputs" type="email" placeholder="Inserisci email di chi ha ritrovato l'animale" />
            </Form.Group>

            <Form.Group as={Col} xs={12} sm={6} controlId="formGridPhone" className="mt-3">
              <Form.Label className="fst-italic fw-semibold">Numero di Telefono</Form.Label>
              <Form.Control autoComplete="off" className="form-inputs" placeholder="Inserisci il telefono chi ha ritrovato l'animale" type="number" />
            </Form.Group>
          </Row>

          <div className="d-flex justify-content-center mt-4">
            <Button variant="outline-none" className="add-animal-btn">
              Aggiungi animale
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default AddAnimalPage;
