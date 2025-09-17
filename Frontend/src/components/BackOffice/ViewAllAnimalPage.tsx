import { Button, Container, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { allAnimalFetch, setPage } from "../../redux/actions/animalSlice";
import FilterOffcanvas from "../FilterOffcanvas";
import { useSearchParams } from "react-router-dom";
// import { useSearchParams } from "react-router-dom";

const ViewAllAnimalPage = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

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

  return (
    <>
      <Container fluid id="bo-all-animal-section" className="navbar-height d-flex flex-column justify-content-start align-items-start information pb-4">
        <h2 className="titles mx-auto mb-2 mt-4">Animali</h2>
        <h4 className="subtitles mx-auto">Visualizza tutti gli animali</h4>
        <FilterOffcanvas />
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
