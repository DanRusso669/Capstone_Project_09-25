import { Button, Col, Form, Offcanvas, Row } from "react-bootstrap";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { allAnimalFetch, resetFilters, setBreed, setGender, setPage, setProvince, setSpecies, setStatus } from "../redux/actions/animalSlice";
import { ArrowRightShort, ArrowLeftShort } from "react-bootstrap-icons";
import { useSearchParams } from "react-router-dom";

const FilterOffcanvas = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const firstRender = useRef(true);
  const lastParams = useRef("");
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const {
    filters: { gender, species, breed, province, status },
  } = useAppSelector(state => state.animals);

  useEffect(() => {
    if (firstRender.current) {
      handleFilterReset();
      dispatch(setPage(0));
      dispatch(allAnimalFetch(""));
      firstRender.current = false;
      lastParams.current = "";
      return;
    }

    if (lastParams.current == searchParams.toString()) return;

    dispatch(allAnimalFetch(searchParams.toString()));
    lastParams.current = searchParams.toString();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, searchParams, setSearchParams]);

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
    dispatch(resetFilters());
    setShowOffcanvas(false);
  };

  return (
    <>
      <Button variant="outline-none" className="subtitles filter-btn me-3" onClick={handleShowOffcanvas}>
        <ArrowRightShort /> Filtri <ArrowLeftShort />
      </Button>
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
                <Form.Check type="radio" checked={gender === ""} value="" label="Nessuna selezione" name="sesso" onChange={handleGenderChange} />
                <Form.Check type="radio" checked={gender === "MALE"} value="MALE" label="Maschio" name="sesso" onChange={handleGenderChange} />
                <Form.Check type="radio" checked={gender === "FEMALE"} value="FEMALE" label="Femmina" name="sesso" onChange={handleGenderChange} />
              </Form.Group>

              <Form.Group as={Col} md={6} lg={4} className="mb-3">
                <Form.Label className="fst-italic fw-semibold">Status</Form.Label>
                <Form.Check type="radio" checked={status === ""} value="" label="Nessuna selezione" name="status" onChange={handleAnimalStatusChange} />
                <Form.Check
                  type="radio"
                  checked={status === "HOSPITALIZED"}
                  value="HOSPITALIZED"
                  label="Ricoverato"
                  name="status"
                  onChange={handleAnimalStatusChange}
                />
                <Form.Check
                  type="radio"
                  checked={status === "RELEASED"}
                  value="RELEASED"
                  label="Rilasciato"
                  name="status"
                  onChange={handleAnimalStatusChange}
                />
                <Form.Check type="radio" checked={status === "DEAD"} value="DEAD" label="Deceduto" name="status" onChange={handleAnimalStatusChange} />
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

export default FilterOffcanvas;
