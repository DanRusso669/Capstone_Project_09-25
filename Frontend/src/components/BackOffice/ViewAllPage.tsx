import { Button, Container, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { allAnimalFetch, resetFilters, setPage as setAnimalPage, setSortBy, setSortByDirection } from "../../redux/actions/animalSlice";
import { allAdoptionFetch, setPage as setAdoptionPage } from "../../redux/actions/adoptionSlice";
import FilterOffcanvas from "../FilterOffcanvas";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeftShort, ArrowReturnLeft, ArrowRightShort, SortAlphaDown, SortAlphaDownAlt, SortNumericDown, SortNumericDownAlt } from "react-bootstrap-icons";
import { useEffect } from "react";
import "./viewAll.css";

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
        <Link to={"/back-office"} className="w-100">
          <h4 className="subtitles mt-2 text-center go-back-btn">
            Torna indietro <ArrowReturnLeft />
          </h4>
        </Link>
        <div className="d-flex justify-content-center w-100">
          {searchParams.toString() !== "" && (
            <Button variant="outline-none" className="subtitles filter-btn" onClick={handleFilterReset}>
              <ArrowRightShort /> Resetta tutti i filtri <ArrowLeftShort />
            </Button>
          )}
          <FilterOffcanvas />
        </div>
        <div className="view-all-table-wrapper">
          <Table bordered hover striped className="view-all-table mt-3 mx-auto">
            <thead>
              {isAnimalPage ? (
                <tr>
                  <th onClick={() => handleSorting("id")}>
                    ID{" "}
                    {animalSortByDirection === "asc" && animalSortBy === "id" ? (
                      <SortNumericDown className="ms-2" />
                    ) : animalSortByDirection === "desc" && animalSortBy === "id" ? (
                      <SortNumericDownAlt className="ms-2" />
                    ) : null}
                  </th>
                  <th onClick={() => handleSorting("name")}>
                    Nome
                    {animalSortByDirection === "asc" && animalSortBy === "name" ? (
                      <SortAlphaDown className="ms-2" />
                    ) : animalSortByDirection === "desc" && animalSortBy === "name" ? (
                      <SortAlphaDownAlt className="ms-2" />
                    ) : null}
                  </th>
                  <th>Età</th>
                  <th>Sesso</th>
                  <th>Specie</th>
                  <th>Razza</th>
                  <th>Status</th>
                  <th>Città</th>
                  <th>Provincia</th>
                  <th>Regione</th>
                  <th>Data di Ingresso</th>
                  <th>Data del Rilascio</th>
                  <th>Data del Decesso</th>
                  <th>Cause del Decesso</th>
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
        </div>
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
