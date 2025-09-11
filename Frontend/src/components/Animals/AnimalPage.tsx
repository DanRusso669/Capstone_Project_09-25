import { Button, Card, Col, Container, Form, Offcanvas, Row } from "react-bootstrap";
import "./animalPage.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { allAnimalFetch, setPage } from "../../redux/actions/animalSlice";
import { Link } from "react-router-dom";

const AnimalPage = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const dispatch = useAppDispatch();
  const {
    data: { list },
    status,
    page,
  } = useAppSelector(state => state.animals);

  useEffect(() => {
    if (list.length === 0) {
      dispatch(allAnimalFetch());
    }
  }, [list.length, dispatch]);

  const loadMoreAnimals = () => {
    if (status === "pending") return;
    dispatch(setPage(page + 1));
    dispatch(allAnimalFetch());
  };

  const handleShowOffcanvas = () => setShowOffcanvas(!showOffcanvas);

  return (
    <>
      <Container id="animal-section" className="navbar-height information d-flex flex-column justify-content-start align-items-start mb-4">
        <h1 className="titles mx-auto mb-2 mt-4">Gli ospiti del Rifugio</h1>
        <p className="mb-4">
          Benvenuti nella nostra pagina dedicata agli animali che hanno trovato una casa nel Rifugio. Qui potrete scoprire le storie degli{" "}
          <span className="fw-bold">ospiti attuali e passati</span> del rifugio, animali che, a causa di infortuni, malattie o altre difficoltà, sono stati
          accolti e curati con amore e professionalità. <br />
          Ogni scheda racconta il loro percorso di recupero e riabilitazione, un viaggio verso la libertà che speriamo possiate seguire con noi. Vi invitiamo a
          esplorare le storie di questi straordinari animali e a conoscere più da vicino{" "}
          <span className="fw-bold">il nostro impegno nella tutela della fauna selvatica</span>.
        </p>
        <h3 className="subtitles mx-auto">Ultimi arrivati</h3>
        <Button variant="outline-none" className="filter-btn ms-auto fs-5 me-2" onClick={handleShowOffcanvas}>
          Filtri
        </Button>
        <Row className="gy-2 gx-2">
          {list.length !== 0 ? (
            list.map(animal => (
              <Col key={animal.id} xs={12} md={6}>
                <Card className="d-flex flex-column flex-lg-row align-items-center justify-content-between mb-2 rounded-5 animal-card">
                  <Col className="text-center">
                    <Card.Img src={animal.imageUrl} className="mt-4 mt-lg-0 ms-4" />
                  </Col>
                  <Card.Body as={Col} className="d-flex flex-column justify-content-center align-items-center px-0">
                    <Card.Title className="text-center">{animal.name}</Card.Title>
                    <Card.Text>
                      <span className="fw-medium fst-italic">Sesso</span>: {animal.gender === "MALE" ? "Maschio" : "Femmina"}
                      <br />
                      <span className="fw-medium fst-italic">Specie</span>: {animal.species}
                      <br />
                      <span className="fw-medium fst-italic">Razza</span>: {animal.breed}
                      <br />
                      <span className="fw-medium fst-italic">Status</span>:{" "}
                      {animal.status === "HOSPITALIZED" ? "Ricoverato" : animal.status === "RELEASED" ? "Rilasciato" : "Deceduto"}
                      <br />
                    </Card.Text>
                    <div className="d-flex justify-content-end details-btn-wrapper mt-3 mb-2">
                      <Link to={`/dettagli/${animal.id}`} className="ms-auto details-btn">
                        Dettagli
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <>
              <h4>Putroppo non ci sono animali al momento</h4>
            </>
          )}
        </Row>

        {status === "pending" ? (
          <Button variant="outline-none" className="mt-4 load-more-btn mx-auto" disabled>
            Caricamento...
          </Button>
        ) : (
          <Button variant="outline-none" className="mt-4 load-more-btn mx-auto" onClick={loadMoreAnimals}>
            Carica di più
          </Button>
        )}
      </Container>

      <Offcanvas id="filter-offcanvas" show={showOffcanvas} onHide={handleShowOffcanvas} placement="top">
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Title>
          <h4 className="subtitles fs-5 text-center">Filtra per</h4>
        </Offcanvas.Title>
        <Offcanvas.Body>
          <Form>
            {/* <Form.Group className="mb-3" controlId="formSortBy">
              <Form.Label>Ordina per </Form.Label>
              <Form.Select>
                <option>Più recente</option>
                <option>Più vecchio</option>
                <option>Nome</option>
                <option>Specie</option>
                <option>Provincia</option>
              </Form.Select>
            </Form.Group> */}

            <Row className="d-flex flex-row">
              <Form.Group as={Col} md={6} lg={4} className="mb-3" controlId="formSortBy">
                <Form.Label className="fst-italic fw-semibold">Specie</Form.Label>
                <Form.Select>
                  <option>- - -</option>
                  <option value={1}>Cervidi</option>
                  <option value={2}>Volatili</option>
                  <option value={3}>Suidi</option>
                  <option value={4}>Specie</option>
                  <option value={5}>Provincia</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} md={6} lg={4} className="mb-3" controlId="formSortBy">
                <Form.Label className="fst-italic fw-semibold">Provincia</Form.Label>
                <Form.Select>
                  <option>- - -</option>
                  <option value={1}>Torino</option>
                  <option value={2}>Vercelli</option>
                  <option value={3}>Novara</option>
                  <option value={4}>Verbania</option>
                  <option value={5}>Varese</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} md={6} lg={4} className="mb-3">
                <Form.Label className="fst-italic fw-semibold mb-0 mt-2">Razza</Form.Label>
                <Form.Control type="text" placeholder="Inserisci la razza" />
              </Form.Group>

              <Form.Group as={Col} md={6} lg={4} className="mb-3">
                <Form.Label className="fst-italic fw-semibold">Sesso</Form.Label>
                <Form.Check type="checkbox" label="Maschio" />
                <Form.Check type="checkbox" label="Femmina" />
              </Form.Group>

              <Form.Group as={Col} md={6} lg={4} className="mb-3">
                <Form.Label className="fst-italic fw-semibold">Status</Form.Label>
                <Form.Check type="checkbox" label="Ricoverato" />
                <Form.Check type="checkbox" label="Rilasciato" />
                <Form.Check type="checkbox" label="Deceduto" />
              </Form.Group>
            </Row>

            <div className="d-flex w-100 justify-content-end">
              <Button variant="outline-none" type="submit" className="filter-submit-btn me-4">
                Submit
              </Button>
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default AnimalPage;
