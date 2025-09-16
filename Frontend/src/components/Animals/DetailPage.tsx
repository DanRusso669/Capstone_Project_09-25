import { useEffect } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { animalCRUDFetch } from "../../redux/actions/animalSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useParams } from "react-router-dom";
import "./detail.css";

const DetailPage = () => {
  const dispatch = useAppDispatch();
  const { animalId } = useParams() as { animalId: string };
  const {
    data: { single },
  } = useAppSelector(state => state.animals);

  useEffect(() => {
    dispatch(animalCRUDFetch({ animalId, method: "GET", animalData: null }));
  }, [animalId, dispatch]);

  return (
    <>
      <Container id="details-section" className="navbar-height information d-flex flex-column justify-content-center align-items-center mb-4">
        <h1 className="titles mx-auto mb-2 mt-4">{single !== null ? `Profilo di ${single.name}` : "Qualcosa non va!"}</h1>
        {single !== null ? (
          <Row className="d-flex flex-column gy-3">
            <Col className="mb-2">
              <Row>
                <Col xs={12} md={7} lg={8} className="d-flex justify-content-center align-items-center">
                  <Image src={single.imageUrl} fluid />
                </Col>
                <Col xs={12} md={5} lg={4}>
                  <h4 className="subtitles text-center mt-3 mb-2 mt-md-0">Caratteristiche di {single.name}</h4>
                  <p>
                    <span className="fw-medium fst-italic">Sesso</span>: {single.gender === "MALE" ? "Maschio" : "Femmina"}
                  </p>
                  <p>
                    <span className="fw-medium fst-italic">Specie</span>: {single.species}
                  </p>
                  <p>
                    <span className="fw-medium fst-italic">Razza</span>: {single.breed}
                  </p>
                  <p>
                    <span className="fw-medium fst-italic">Città</span>: {single.city}
                  </p>
                  <p>
                    <span className="fw-medium fst-italic">Provincia</span>: {single.province}
                  </p>
                  <p>
                    <span className="fw-medium fst-italic">Regione</span>: {single.region}
                  </p>
                  <p>
                    <span className="fw-medium fst-italic">Ingresso al Rifugio</span>:{" "}
                    {single.entryDate ? new Date(single.entryDate).toLocaleDateString() : "Nessuna data disponibile."}
                  </p>
                  <p className=" d-none d-lg-inline">
                    <span className="fw-medium fst-italic">Descrizione</span>: <br />
                    {single.description}
                  </p>
                </Col>
                <p className="d-inline d-lg-none mt-md-2 ">
                  <span className="fw-medium fst-italic">Descrizione</span>: <br />
                  {single.description}
                </p>
              </Row>
            </Col>
            <Col>
              <h4 className="subtitles text-center mt-3 mb-2 mt-md-0">Cartella Clinica di {single.name}</h4>
              <p>
                <span className="fw-medium fst-italic">Status</span>:{" "}
                {single.status === "HOSPITALIZED" ? "Ricoverato" : single.status === "RELEASED" ? "Rilasciato" : "Deceduto"}
              </p>
              <p>
                <span className="fw-medium fst-italic">Data di Rilascio</span>:{" "}
                {single.releaseDate ? new Date(single.releaseDate).toLocaleDateString() : "Nessuna data disponibile."}
              </p>
              <p>
                <span className="fw-medium fst-italic">Trovato da</span>: {single.foundBy?.userName + " " + single.foundBy?.userSurname}
              </p>
              <p>
                <span className="fw-medium fst-italic">Condizione Clinica</span>: <br />
                {single.clinicalCondition}
              </p>
              <p>
                <span className="fw-medium fst-italic">Data del decesso</span>:{" "}
                {single.deathDate ? new Date(single.deathDate).toLocaleDateString() : "Nessuna data disponibile."}
              </p>
              <p>
                <span className="fw-medium fst-italic">Causa del decesso</span>: {single.deathCause ? single.deathCause : "Nessun dato disponibile."}
              </p>
            </Col>
          </Row>
        ) : (
          <>
            <p>Non c'è niente da vedere qui.</p>
          </>
        )}
      </Container>
    </>
  );
};

export default DetailPage;
