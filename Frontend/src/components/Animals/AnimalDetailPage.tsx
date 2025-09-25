import { useEffect } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { animalCRUDFetch } from "../../redux/actions/animalSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import "./animalPage.css";
import { toast } from "react-toastify";
import { adoptionCRUDFetch } from "../../redux/actions/adoptionSlice";
import { ArrowReturnLeft } from "react-bootstrap-icons";

type BackendError = {
  message: string;
  timestamp: string;
};

const AnimalDetailPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { animalId } = useParams() as { animalId: string };
  const {
    data: { single },
  } = useAppSelector(state => state.animals);

  useEffect(() => {
    dispatch(animalCRUDFetch({ animalId, method: "GET", animalData: null }));
  }, [animalId, dispatch]);

  const handleAdoption = async () => {
    try {
      await toast.promise(
        dispatch(adoptionCRUDFetch({ adoptionId: animalId, method: "POST", adoptionData: null })).unwrap(),
        {
          pending: "Adozione in corso...",
          success: "Adozione effettuata con successo!",
          error: "Si è verificato un errore durante l'adozione.",
        },
        { autoClose: 4000 }
      );

      dispatch(animalCRUDFetch({ animalId, method: "GET", animalData: null }));
    } catch (error) {
      const backendError = error as BackendError;
      toast.error(backendError.message);
    }
  };

  return (
    <>
      <Container id="animal-details-section" className="navbar-height information d-flex flex-column justify-content-center align-items-center mb-4">
        <h1 className="titles text-center mb-2 mt-4 position-relative w-75">
          {single !== null ? `Profilo di ${single.name}` : "Qualcosa non va!"}
          <ArrowReturnLeft className="go-back-btn d-none d-lg-block" onClick={() => navigate("/i-nostri-animali?sortByDirection=desc")} />
        </h1>
        {single !== null ? (
          <Row className="d-flex flex-column justify-content-center align-items-center gy-3">
            <Col className="d-flex justify-content-center align-items-center">
              <Image src={single.imageUrl} fluid className="rounded-5" />
            </Col>
            {single.adoptable && (
              <>
                <Col className="text-center">
                  <h4 className="subtitles text-center mb-2 mt-md-0">Questo animale è adottabile</h4>
                  <p>
                    I nostri animali hanno sempre bisogno di sostegno e <span className="fw-bold">tu puoi fare la differenza</span>.
                  </p>
                  <p>
                    {`Se vuoi adottare ${single.name},`}{" "}
                    <span className="adoption-btn" onClick={handleAdoption}>
                      clicca qui.
                    </span>
                  </p>
                </Col>
              </>
            )}
            <Col>
              <Row className="d-flex flex-row justify-content-center">
                <h4 className="subtitles text-center mt-3 mb-2 mt-md-0">Caratteristiche di {single.name}</h4>
                <Col md={12} lg={6} className="text-lg-end text-center">
                  <p>
                    <span className="fw-medium fst-italic">Sesso</span>: {single.gender === "MALE" ? "Maschio" : "Femmina"}
                  </p>
                  <p>
                    <span className="fw-medium fst-italic">Specie</span>: {single.species}
                  </p>
                  <p>
                    <span className="fw-medium fst-italic">Razza</span>: {single.breed}
                  </p>
                </Col>
                <Col md={12} lg={6} className="text-lg-start text-center">
                  <p>
                    <span className="fw-medium fst-italic">Città</span>: {single.city}
                  </p>
                  <p>
                    <span className="fw-medium fst-italic">Provincia</span>: {single.province}
                  </p>
                  <p>
                    <span className="fw-medium fst-italic">Regione</span>: {single.region}
                  </p>
                </Col>
              </Row>
            </Col>
            <Col className="text-center mt-0">
              <p>
                <span className="fw-medium fst-italic">Ingresso al Rifugio</span>:{" "}
                {single.entryDate ? new Date(single.entryDate).toLocaleDateString() : "Nessuna data disponibile."}
              </p>
              <p className=" mt-md-2 ">
                <span className="fw-medium fst-italic">Descrizione</span>: <br />
                {single.description}
              </p>
            </Col>

            <Col>
              <Row>
                <h4 className="subtitles text-center mt-3 mb-2 mt-md-0">Cartella Clinica di {single.name}</h4>
                <Col md={12} lg={6} className="text-lg-end text-center">
                  <p>
                    <span className="fw-medium fst-italic">Status</span>:{" "}
                    {single.status === "HOSPITALIZED" ? "Ricoverato" : single.status === "RELEASED" ? "Rilasciato" : "Deceduto"}
                  </p>
                  <p>
                    <span className="fw-medium fst-italic">Data di Rilascio</span>:{" "}
                    {single.releaseDate ? new Date(single.releaseDate).toLocaleDateString() : "Nessuna data disponibile."}
                  </p>
                </Col>
                <Col md={12} lg={6} className="text-lg-start text-center">
                  <p>
                    <span className="fw-medium fst-italic">Data del decesso</span>:{" "}
                    {single.deathDate ? new Date(single.deathDate).toLocaleDateString() : "Nessuna data disponibile."}
                  </p>
                  <p>
                    <span className="fw-medium fst-italic">Causa del decesso</span>: {single.deathCause ? single.deathCause : "Nessun dato disponibile."}
                  </p>
                </Col>
              </Row>
            </Col>
            <Col className="text-center mt-0">
              <p>
                <span className="fw-medium fst-italic">Trovato da</span>: {single.foundBy?.userName + " " + single.foundBy?.userSurname}
              </p>
              <p className=" mt-md-2 ">
                <span className="fw-medium fst-italic">Condizione Clinica</span>: <br />
                {single.clinicalCondition}
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

export default AnimalDetailPage;
