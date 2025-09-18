import { Button, Container, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { allAnimalFetch, resetFilters, setPage as setAnimalPage, setSortBy, setSortByDirection } from "../../redux/actions/animalSlice";
import { allAdoptionFetch, setPage as setAdoptionPage } from "../../redux/actions/adoptionSlice";
import FilterOffcanvas from "../FilterOffcanvas";
import { useSearchParams } from "react-router-dom";
import { ArrowLeftShort, ArrowRightShort, SortAlphaDown, SortAlphaDownAlt, SortNumericDown, SortNumericDownAlt } from "react-bootstrap-icons";
import { useEffect } from "react";

const ViewAllPage = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const isAnimalPage = location.pathname.includes("visualizza/animali");
  const isAdoptionPage = location.pathname.includes("visualizza/adozioni");

  const {
    data: { list: animalList },
    requestStatus: animalRequestStatus,
    filters: { page: animalPage, status: animalStatus, lastPage: animalLastPage, sortBy: animalSortBy, sortByDirection: animalSortByDirection },
  } = useAppSelector(state => state.animals);

  const {
    data: { list: adoptionList },
    requestStatus: adoptionRequestStatus,
    filters: { page: adoptionPage },
  } = useAppSelector(state => state.adoptions);

  const loadMoreAnimals = () => {
    if (isAnimalPage) {
      if (animalRequestStatus === "pending") return;
      dispatch(setAnimalPage(animalPage + 1));
      dispatch(allAnimalFetch(searchParams.toString()));
    } else {
      if (adoptionRequestStatus === "pending") return;
      dispatch(setAdoptionPage(adoptionPage + 1));
      dispatch(allAdoptionFetch(searchParams.toString()));
    }
  };

  const handleFilterReset = () => {
    setSearchParams("");
    dispatch(resetFilters());
  };

  const handleSorting = (property: string) => {
    dispatch(setAnimalPage(0));
    dispatch(setSortBy(property));
    const sortingParams = new URLSearchParams(searchParams);

    sortingParams.set("sortBy", property);
    const newSortDirection = animalSortByDirection === "asc" ? "desc" : "asc";
    dispatch(setSortByDirection(newSortDirection));
    sortingParams.set("sortByDirection", newSortDirection);

    setSearchParams(sortingParams);
  };

  useEffect(() => {
    if (isAdoptionPage) {
      dispatch(allAdoptionFetch(searchParams.toString()));
    }
    console.log(adoptionList);
  }, [dispatch, isAdoptionPage, searchParams]);

  return (
    <>
      <Container fluid id="back-office-viewAll-section" className="navbar-height d-flex flex-column justify-content-start align-items-start information pb-4">
        <h2 className="titles mx-auto mb-2 mt-4">{isAnimalPage ? "Animali" : "Adozioni"}</h2>
        <h4 className="subtitles mx-auto">{isAnimalPage ? "Visualizza tutti gli animali" : "Visualizza tutte le adozioni"}</h4>
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
            {isAnimalPage ? (
              <tr>
                <th style={{ width: "5%" }} onClick={() => handleSorting("id")}>
                  ID{" "}
                  {animalSortByDirection === "asc" && animalSortBy === "id" ? (
                    <SortNumericDown className="ms-2" />
                  ) : animalSortByDirection === "desc" && animalSortBy === "id" ? (
                    <SortNumericDownAlt className="ms-2" />
                  ) : null}
                </th>
                <th style={{ width: "8%" }} onClick={() => handleSorting("name")}>
                  Nome
                  {animalSortByDirection === "asc" && animalSortBy === "name" ? (
                    <SortAlphaDown className="ms-2" />
                  ) : animalSortByDirection === "desc" && animalSortBy === "name" ? (
                    <SortAlphaDownAlt className="ms-2" />
                  ) : null}
                </th>
                <th style={{ width: "3%" }}>Età</th>
                <th style={{ width: "5%" }}>Sesso</th>
                <th style={{ width: "5%" }}>Specie</th>
                <th style={{ width: "5%" }}>Razza</th>
                {/* <th>Descrizione</th>
              <th style={{ width: "7.14%" }} >Condizione Clinica</th> */}
                <th style={{ width: "7%" }}>Status</th>
                <th style={{ width: "6.5%" }}>Città</th>
                <th style={{ width: "6.5%" }}>Provincia</th>
                <th style={{ width: "6%" }}>Regione</th>
                <th style={{ width: "7%" }}>Data di Ingresso</th>
                <th style={{ width: "8%" }}>Data del Rilascio</th>
                <th style={{ width: "8%" }}>Data del Decesso</th>
                <th style={{ width: "20%" }}>Cause del Decesso</th>
              </tr>
            ) : (
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th>Nome Utente</th>
                <th>Cognome Utente</th>
                <th>Animale</th>
                <th>Data della Richiesta</th>
                <th>Data di Inizio</th>
                <th>Data di Fine</th>
              </tr>
            )}
          </thead>
          {isAnimalPage ? (
            <tbody>
              {animalList.map(animal => (
                <tr key={animal.id}>
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
          ) : (
            <tbody>
              {adoptionList.map(adoption => (
                <tr key={adoption.id}>
                  <td>{adoption.id}</td>
                  <td>{adoption.status}</td>
                  <td>{adoption.user?.userName}</td>
                  <td>{adoption.user?.userSurname}</td>
                  <td>{adoption.animal?.name}</td>
                  <td>{adoption.requestDate ? new Date(adoption.requestDate).toLocaleDateString("it-IT") : "Non disponibile"}</td>
                  <td>{adoption.startDate ? new Date(adoption.startDate).toLocaleDateString("it-IT") : "Non disponibile"}</td>
                  <td>{adoption.endDate ? new Date(adoption.endDate).toLocaleDateString("it-IT") : "Non disponibile"}</td>
                </tr>
              ))}
            </tbody>
          )}
        </Table>
        {isAnimalPage ? (
          animalStatus === "pending" ? (
            <Button variant="outline-none" className="mt-4 load-more-btn mx-auto" disabled>
              Caricamento...
            </Button>
          ) : (
            <Button variant="outline-none" className={`mt-4 load-more-btn mx-auto ${animalLastPage && "d-none"}`} onClick={loadMoreAnimals}>
              Carica di più
            </Button>
          )
        ) : (
          <></>
        )}
      </Container>
    </>
  );
};

export default ViewAllPage;
