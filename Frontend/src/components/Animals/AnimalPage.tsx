import { Button, Card, Col, Container, Form, Offcanvas, Row } from "react-bootstrap";
import "./animalPage.css";
import { useEffect, useState, type ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { allAnimalFetch, setBreed, setGender, setPage, setProvince, setSpecies, setStatus } from "../../redux/actions/animalSlice";
import { Link, useSearchParams } from "react-router-dom";

const AnimalPage = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const {
    data: { list },
    requestStatus,
    filters: { page, gender, species, breed, province, status, lastPage },
  } = useAppSelector(state => state.animals);

  useEffect(() => {
    dispatch(allAnimalFetch(searchParams.toString()));
  }, [dispatch, searchParams]);

  const loadMoreAnimals = () => {
    if (requestStatus === "pending") return;
    dispatch(setPage(page + 1));
    dispatch(allAnimalFetch(searchParams.toString()));
  };

  const handleShowOffcanvas = () => setShowOffcanvas(!showOffcanvas);

  const handleSpeciesChange = (e: ChangeEvent<HTMLSelectElement>) => dispatch(setSpecies(e.target.value));
  const handleProvinceChange = (e: ChangeEvent<HTMLSelectElement>) => dispatch(setProvince(e.target.value));
  const handleBreedChange = (e: ChangeEvent<HTMLInputElement>) => dispatch(setBreed(e.target.value));
  const handleGenderChange = (e: ChangeEvent<HTMLInputElement>) => dispatch(setGender(e.target.value));
  const handleAnimalStatusChange = (e: ChangeEvent<HTMLInputElement>) => dispatch(setStatus(e.target.value));

  const handleFilteredSearch = () => {
    const newParams: Record<string, string> = {};

    if (gender) newParams.gender = gender;
    if (species) newParams.species = species;
    if (province) newParams.province = province;
    if (breed) newParams.breed = breed;
    if (status) newParams.status = status;
    dispatch(setPage(0));
    setSearchParams(newParams);
    handleShowOffcanvas();
  };

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
        <Row className="gy-2 gx-2 w-100">
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
          <Button variant="outline-none" className={`mt-4 load-more-btn mx-auto ${lastPage && "d-none"}`} onClick={loadMoreAnimals}>
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
                <Form.Select value={species} onChange={handleSpeciesChange}>
                  <option value={""}>- - -</option>
                  <option value={"Cervide"}>Cervidi</option>
                  <option value={"Volatile"}>Volatili</option>
                  <option value={"Suide"}>Suidi</option>
                  <option value={"Ungolato"}>Specie</option>
                  <option value={"Rapace"}>Provincia</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} md={6} lg={4} className="mb-3" controlId="formSortBy">
                <Form.Label className="fst-italic fw-semibold">Provincia</Form.Label>
                <Form.Select value={province} onChange={handleProvinceChange}>
                  <option value={""}>- - -</option>
                  <option value={"Torino"}>Torino</option>
                  <option value={"Vercelli"}>Vercelli</option>
                  <option value={"Novara"}>Novara</option>
                  <option value={"Verbania"}>Verbania</option>
                  <option value={"Varese"}>Varese</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} md={6} lg={4} className="mb-3">
                <Form.Label className="fst-italic fw-semibold mb-0 mt-2">Razza</Form.Label>
                <Form.Control value={breed} type="text" placeholder="Inserisci la razza" onChange={handleBreedChange} />
              </Form.Group>

              <Form.Group as={Col} md={6} lg={4} className="mb-3">
                <Form.Label className="fst-italic fw-semibold">Sesso</Form.Label>
                <Form.Check type="radio" value="" label="Nessuna selezione" name="sesso" onChange={handleGenderChange} />
                <Form.Check type="radio" value="MALE" label="Maschio" name="sesso" onChange={handleGenderChange} />
                <Form.Check type="radio" value="FEMALE" label="Femmina" name="sesso" onChange={handleGenderChange} />
              </Form.Group>

              <Form.Group as={Col} md={6} lg={4} className="mb-3">
                <Form.Label className="fst-italic fw-semibold">Status</Form.Label>
                <Form.Check type="radio" value="" label="Nessuna selezione" name="status" onChange={handleAnimalStatusChange} />
                <Form.Check type="radio" value="HOSPITALIZED" label="Ricoverato" name="status" onChange={handleAnimalStatusChange} />
                <Form.Check type="radio" value="RELEASED" label="Rilasciato" name="status" onChange={handleAnimalStatusChange} />
                <Form.Check type="radio" value="DEAD" label="Deceduto" name="status" onChange={handleAnimalStatusChange} />
              </Form.Group>
            </Row>

            <div className="d-flex w-100 justify-content-end">
              <Button variant="outline-none" className="filter-submit-btn me-4" onClick={handleFilteredSearch}>
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
