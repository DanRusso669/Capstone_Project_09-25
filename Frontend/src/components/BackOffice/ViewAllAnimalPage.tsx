import { Button, Container, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { allAnimalFetch, resetFilters, setPage } from "../../redux/actions/animalSlice";
import FilterOffcanvas from "../FilterOffcanvas";
import { useSearchParams } from "react-router-dom";
import { ArrowLeftShort, ArrowRightShort } from "react-bootstrap-icons";
// import { useSearchParams } from "react-router-dom";

const ViewAllAnimalPage = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

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
      <Container fluid id="bo-all-animal-section" className="navbar-height d-flex flex-column justify-content-start align-items-start information pb-4">
        <h2 className="titles mx-auto mb-2 mt-4">Animali</h2>
        <h4 className="subtitles mx-auto">Visualizza tutti gli animali</h4>
        <div className="d-flex justify-content-center w-100">
          {searchParams.toString() !== "" && (
            <Button variant="outline-none" className="subtitles filter-btn" onClick={handleFilterReset}>
              <ArrowRightShort /> Resetta tutti i filtri <ArrowLeftShort />
            </Button>
          )}
          <FilterOffcanvas />
        </div>
        <Table bordered hover striped className="mt-3">
          <thead>
            <tr>
              <th style={{ width: "2%" }}>ID</th>
              <th style={{ width: "6%" }}>Nome</th>
              <th style={{ width: "2%" }}>Età</th>
              <th style={{ width: "4%" }}>Sesso</th>
              <th style={{ width: "5%" }}>Specie</th>
              <th style={{ width: "5%" }}>Razza</th>
              {/* <th>Descrizione</th>
              <th style={{ width: "7.14%" }} >Condizione Clinica</th> */}
              <th style={{ width: "7%" }}>Status</th>
              <th style={{ width: "5.5%" }}>Città</th>
              <th style={{ width: "5.5%" }}>Provincia</th>
              <th style={{ width: "5%" }}>Regione</th>
              <th style={{ width: "6%" }}>Data di Ingresso</th>
              <th style={{ width: "6%" }}>Data del Rilascio</th>
              <th style={{ width: "6%" }}>Data del Decesso</th>
              <th style={{ width: "10%" }}>Cause del Decesso</th>
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
                {/* <td>{animal.description}</td>
                <td>{animal.clinicalCondition}</td> */}
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

export default ViewAllAnimalPage;
