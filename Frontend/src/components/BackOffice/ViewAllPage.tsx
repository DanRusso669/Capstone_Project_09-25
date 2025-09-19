import { Button, Container, Form, Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  allAnimalFetch,
  resetFilters,
  setPage as setAnimalPage,
  setSortBy,
  setSortByDirection as setAnimalSortByDirection,
} from "../../redux/actions/animalSlice";
import { allAdoptionFetch, setPage as setAdoptionPage, setSortByDirection as setAdoptionSortByDirection } from "../../redux/actions/adoptionSlice";
import FilterOffcanvas from "../FilterOffcanvas";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeftShort, ArrowReturnLeft, ArrowRightShort, SortAlphaDown, SortAlphaDownAlt, SortNumericDown, SortNumericDownAlt } from "react-bootstrap-icons";
import { useEffect, useRef, useState } from "react";
import "./viewAll.css";

const ViewAllPage = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [adoptionStatusParam, setAdoptionStatusParam] = useState("");
  const isAnimalPage = location.pathname.includes("visualizza/animali");
  const isAdoptionPage = location.pathname.includes("visualizza/adozioni");
  const firstRender = useRef(true);
  const lastParams = useRef("");

  const {
    data: { list: animalList },
    requestStatus: animalRequestStatus,
    filters: { page: animalPage, lastPage: animalLastPage, sortBy: animalSortBy, sortByDirection: animalSortByDirection },
  } = useAppSelector(state => state.animals);

  const {
    data: { list: adoptionList },
    requestStatus: adoptionRequestStatus,
    filters: { page: adoptionPage, lastPage: adoptionLastPage, sortByDirection: adoptionSortByDirection },
  } = useAppSelector(state => state.adoptions);

  const loadMoreElements = () => {
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
    if (isAnimalPage) {
      dispatch(setAnimalPage(0));
      dispatch(setSortBy(property));
      const sortingParams = new URLSearchParams(searchParams);

      sortingParams.set("sortBy", property);
      const newSortDirection = animalSortByDirection === "asc" ? "desc" : "asc";
      dispatch(setAnimalSortByDirection(newSortDirection));
      sortingParams.set("sortByDirection", newSortDirection);

      setSearchParams(sortingParams);
    }

    if (isAdoptionPage) {
      dispatch(setAdoptionPage(0));

      const sortingParams = new URLSearchParams(searchParams);
      const newSortDirection = adoptionSortByDirection === "asc" ? "desc" : "asc";
      dispatch(setAdoptionSortByDirection(newSortDirection));
      sortingParams.set("sortByDirection", newSortDirection);
      setSearchParams(sortingParams);
      dispatch(allAdoptionFetch(sortingParams.toString()));
    }
  };

  useEffect(() => {
    if (isAdoptionPage && firstRender.current) {
      dispatch(setAdoptionPage(0));
      dispatch(allAdoptionFetch(""));
      firstRender.current = false;
    }

    if (lastParams.current === adoptionStatusParam) return;

    const newParams = new URLSearchParams("");
    if (adoptionStatusParam !== "") {
      dispatch(setAdoptionPage(0));
      newParams.set("status", adoptionStatusParam);
      dispatch(allAdoptionFetch(newParams.toString()));
      lastParams.current = adoptionStatusParam;
    } else {
      dispatch(allAdoptionFetch(""));
      lastParams.current = adoptionStatusParam;
    }
  }, [adoptionStatusParam, dispatch, isAdoptionPage, searchParams]);

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
          {searchParams.toString() !== "" && isAnimalPage && (
            <Button variant="outline-none" className="subtitles filter-btn" onClick={handleFilterReset}>
              <ArrowRightShort /> Resetta tutti i filtri <ArrowLeftShort />
            </Button>
          )}
          {isAdoptionPage ? (
            <>
              <Form className="w-25 mt-2 text-center">
                <Form.Group>
                  <Form.Label className="fst-italic fw-semibold fs-5">Filtra per status</Form.Label>
                  <Form.Select className="fs-5" onChange={e => setAdoptionStatusParam(e.target.value)}>
                    <option value={""}>- - -</option>
                    <option value={"ACCEPTED"}>Accettate</option>
                    <option value={"DENIED"}>Rifiutate</option>
                    <option value={"ENDED"}>Concluse</option>
                    <option value={"PENDING"}>In Attesa</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </>
          ) : (
            <FilterOffcanvas />
          )}
        </div>
        <div className="view-all-table-wrapper">
          <Table bordered hover striped className={`view-all-table ${isAnimalPage ? "mt-3" : "mt-4"} mx-auto`}>
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
                  <th onClick={() => handleSorting("id")}>
                    ID{" "}
                    {adoptionSortByDirection === "asc" ? (
                      <SortNumericDown className="ms-2" />
                    ) : adoptionSortByDirection === "desc" ? (
                      <SortNumericDownAlt className="ms-2" />
                    ) : null}
                  </th>
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
        {isAnimalPage &&
          (animalRequestStatus === "pending" ? (
            <Button variant="outline-none" className="mt-4 load-more-btn mx-auto" disabled>
              Caricamento...
            </Button>
          ) : (
            <Button variant="outline-none" className={`mt-4 load-more-btn mx-auto ${animalLastPage && "d-none"}`} onClick={loadMoreElements}>
              Carica di più
            </Button>
          ))}

        {isAdoptionPage &&
          (adoptionRequestStatus === "pending" ? (
            <Button variant="outline-none" className="mt-4 load-more-btn mx-auto" disabled>
              Caricamento...
            </Button>
          ) : (
            <Button variant="outline-none" className={`mt-4 load-more-btn mx-auto ${adoptionLastPage && "d-none"}`} onClick={loadMoreElements}>
              Carica di più
            </Button>
          ))}
      </Container>
    </>
  );
};

export default ViewAllPage;
