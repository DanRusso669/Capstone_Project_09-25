import { Container, Table, Button, Col, Form, Offcanvas, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect, useState, type ChangeEvent } from "react";
import { allAnimalFetch, setBreed, setGender, setPage, setProvince, setSpecies, setStatus } from "../../redux/actions/animalSlice";
import { useSearchParams } from "react-router-dom";
import { ArrowRightShort, ArrowLeftShort } from "react-bootstrap-icons";

const ViewAllAnimalPage = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const {
    data: { list },
    filters: { gender, species, breed, province, status },
  } = useAppSelector(state => state.animals);

  useEffect(() => {
    dispatch(allAnimalFetch(searchParams.toString()));
  }, [dispatch, searchParams]);

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

  const handleFilterReset = () => {
    setSearchParams("");
    setShowOffcanvas(false);
  };

  return (
    <>
      <Container fluid id="view-all-animal-section" className="navbar-height d-flex flex-column justify-content-start align-items-start information mb-4">
        <h2 className="titles mx-auto mb-2 mt-4">Animali</h2>
        <h4 className="subtitles mx-auto">Visualizza tutti gli animali</h4>
        <Button variant="outline-none" className="subtitles filter-btn me-3" onClick={handleShowOffcanvas}>
          <ArrowRightShort /> Filtri <ArrowLeftShort />
        </Button>
        <Table bordered hover className="mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Età</th>
              <th>Sesso</th>
              <th>Specie</th>
              <th>Razza</th>
              <th>Descrizione</th>
              <th>Condizione Clinica</th>
              <th>Status</th>
              <th>Città</th>
              <th>Provincia</th>
              <th>Regione</th>
              <th>Data di Ingresso</th>
              <th>Data del Rilascio</th>
              <th>Data del Decesso</th>
              <th>Cause del Decesso</th>
            </tr>
          </thead>
          <tbody>
            {list.map(animal => (
              <tr>
                <td>{animal.id}</td>
                <td>{animal.name}</td>
                <td>{animal.age}</td>
                <td>{animal.gender}</td>
                <td>{animal.species}</td>
                <td>{animal.breed}</td>
                <td>{animal.description}</td>
                <td>{animal.clinicalCondition}</td>
                <td>{animal.status}</td>
                <td>{animal.city}</td>
                <td>{animal.province}</td>
                <td>{animal.region}</td>
                <td>{animal.entryDate ? new Date(animal.entryDate).toLocaleDateString("it-IT") : "Non disponibile."}</td>
                <td>{animal.releaseDate ? new Date(animal.releaseDate).toLocaleDateString("it-IT") : "Non disponibile."}</td>
                <td>{animal.deathDate ? new Date(animal.deathDate).toLocaleDateString("it-IT") : "Non disponibile."}</td>
                <td>{animal.deathCause}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Offcanvas id="filter-offcanvas" show={showOffcanvas} onHide={handleShowOffcanvas} placement="top">
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Title>
          <h4 className="subtitles fs-5 text-center">Filtra per</h4>
        </Offcanvas.Title>
        <Offcanvas.Body className="mx-5">
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

            <div className="d-flex w-100 justify-content-end align-items-center">
              <p className="me-4 subtitles reset-btn" onClick={handleFilterReset}>
                Resetta tutti i filtri
              </p>
              <Button variant="outline-none" className="filter-submit-btn me-4" onClick={handleFilteredSearch}>
                Filtra
              </Button>
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default ViewAllAnimalPage;
