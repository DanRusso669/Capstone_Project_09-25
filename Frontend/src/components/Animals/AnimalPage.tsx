import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "./animalPage.css";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { allAnimalFetch, resetFilters, setPage } from "../../redux/actions/animalSlice";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRightShort, ArrowLeftShort } from "react-bootstrap-icons";
import FilterOffcanvas from "../FilterOffcanvas";

const AnimalPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const {
    data: { list },
    requestStatus,
    filters: { page, status, lastPage },
  } = useAppSelector(state => state.animals);

  const loadMoreAnimals = () => {
    if (requestStatus === "pending") return;
    dispatch(setPage(page + 1));
    dispatch(allAnimalFetch(searchParams.toString()));
  };

  const handleFilterReset = () => {
    setSearchParams("");
    dispatch(resetFilters());
  };

  return (
    <>
      <Container id="animal-section" className="navbar-height information d-flex flex-column justify-content-start align-items-start pb-4">
        <h1 className="titles mx-auto mb-2 mt-4">Gli ospiti del Rifugio</h1>
        <p className="mb-4">
          Benvenuti nella nostra pagina dedicata agli animali che hanno trovato una casa nel Rifugio. Qui potrete scoprire le storie degli{" "}
          <span className="fw-bold">ospiti attuali e passati</span> del rifugio, animali che, a causa di infortuni, malattie o altre difficoltà, sono stati
          accolti e curati con amore e professionalità. <br />
          Ogni scheda racconta il loro percorso di recupero e riabilitazione, un viaggio verso la libertà che speriamo possiate seguire con noi. Vi invitiamo a
          esplorare le storie di questi straordinari animali e a conoscere più da vicino{" "}
          <span className="fw-bold">il nostro impegno nella tutela della fauna selvatica</span>.
        </p>
        <h2 className="subtitles mx-auto">Ultimi arrivati</h2>
        <div className={`d-flex  ${searchParams.toString() !== "" ? "justify-content-center" : "justify-content-end"} justify-content-lg-end w-100`}>
          {searchParams.toString() !== "" && (
            <Button variant="outline-none" className="subtitles filter-btn" onClick={handleFilterReset}>
              <ArrowRightShort /> Resetta tutti i filtri <ArrowLeftShort />
            </Button>
          )}
          <FilterOffcanvas />
        </div>
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
    </>
  );
};

export default AnimalPage;
