import { Container, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect } from "react";
import { allAnimalFetch } from "../../redux/actions/animalSlice";

const ViewAllAnimalPage = () => {
  const dispatch = useAppDispatch();

  const { list } = useAppSelector(state => state.animals.data);

  useEffect(() => {
    dispatch(allAnimalFetch(""));
  }, [dispatch]);

  return (
    <>
      <Container fluid id="view-all-animal-section" className="navbar-height d-flex flex-column justify-content-start align-items-start information mb-4">
        <h2 className="titles mx-auto mb-2 mt-4">Animali</h2>
        <h4 className="subtitles mx-auto">Visualizza tutti gli animali</h4>
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
    </>
  );
};

export default ViewAllAnimalPage;
