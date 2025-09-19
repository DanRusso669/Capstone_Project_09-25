import { Card, Col, Container, Row } from "react-bootstrap";
import "./adoption.css";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { allAdoptionFetch } from "../../redux/actions/adoptionSlice";
import { Link } from "react-router-dom";

const AdoptionPage = () => {
  const dispatch = useAppDispatch();

  const { list } = useAppSelector(state => state.adoptions.data);
  console.log(list);
  useEffect(() => {
    const userJson = localStorage.getItem("user");

    if (userJson !== null) {
      const actualUser = JSON.parse(userJson);
      dispatch(allAdoptionFetch(`userId=${actualUser.id}`));
    }
  }, []);

  return (
    <>
      <Container id="adoption-section" className="navbar-height information d-flex flex-column justify-content-start align-items-start pb-4">
        <h1 className="titles mx-auto mt-4">Adozioni</h1>
        <h2 className="subtitles mx-auto">Le tue adozioni</h2>
        <p className="mb-4 mt-2 text-center mx-auto">
          In questa pagina puoi vedere e gestire tutti gli animali che hai adottato. <br /> Se vuoi terminare una donazione, premi il pulsante rosso di fianco
          al nome dell'animale.
        </p>
        <h4 className="subtitles mt-4 mb-2 ms-sm-3 ms-md-5">Adozioni accettate</h4>
        <Row className="gy-2 gx-2 w-100">
          {list.filter(adoption => adoption.status === "ACCEPTED").length === 0 ? (
            <p className="mb-4 mt-2 ms-sm-3 ms-md-5">Non ci sono adozioni accettate al momento.</p>
          ) : (
            list
              .filter(adoption => adoption.status === "ACCEPTED")
              .map(adoption => (
                <Col key={adoption.animal.id} xs={12} md={6}>
                  <Card className="d-flex flex-column flex-lg-row align-items-center justify-content-between mb-2 rounded-5 animal-card">
                    <Col className="text-center">
                      <Card.Img src={adoption.animal.imageUrl} className="mt-4 mt-lg-0 ms-4" />
                    </Col>
                    <Card.Body as={Col} className="d-flex flex-column justify-content-center align-items-center px-0">
                      <Card.Title className="text-center">{adoption.animal.name}</Card.Title>
                      <Card.Text>
                        <span className="fw-medium fst-italic">Sesso</span>: {adoption.animal.gender === "MALE" ? "Maschio" : "Femmina"}
                        <br />
                        <span className="fw-medium fst-italic">Specie</span>: {adoption.animal.species}
                        <br />
                        <span className="fw-medium fst-italic">Razza</span>: {adoption.animal.breed}
                        <br />
                        <span className="fw-medium fst-italic">Status</span>:{" "}
                        {adoption.animal.status === "HOSPITALIZED" ? "Ricoverato" : adoption.animal.status === "RELEASED" ? "Rilasciato" : "Deceduto"}
                        <br />
                      </Card.Text>
                      <div className="d-flex justify-content-end details-btn-wrapper mt-3 mb-2">
                        <Link to={`/dettagli/${adoption.animal.id}`} className="ms-auto details-btn">
                          Dettagli
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
          )}
        </Row>
        <h4 className="subtitles mt-4 mb-2 ms-sm-3 ms-md-5">Adozioni in attesa</h4>
        <Row className="gy-2 gx-2 w-100">
          {list.filter(adoption => adoption.status === "PENDING").length === 0 ? (
            <p className="mb-4 mt-2 ms-sm-3 ms-md-5">Non ci sono adozioni in attesa al momento.</p>
          ) : (
            list
              .filter(adoption => adoption.status === "PENDING")
              .map(adoption => (
                <Col key={adoption.animal.id} xs={12} md={6}>
                  <Card className="d-flex flex-column flex-lg-row align-items-center justify-content-between mb-2 rounded-5 animal-card">
                    <Col className="text-center">
                      <Card.Img src={adoption.animal.imageUrl} className="mt-4 mt-lg-0 ms-4" />
                    </Col>
                    <Card.Body as={Col} className="d-flex flex-column justify-content-center align-items-center px-0">
                      <Card.Title className="text-center">{adoption.animal.name}</Card.Title>
                      <Card.Text>
                        <span className="fw-medium fst-italic">Sesso</span>: {adoption.animal.gender === "MALE" ? "Maschio" : "Femmina"}
                        <br />
                        <span className="fw-medium fst-italic">Specie</span>: {adoption.animal.species}
                        <br />
                        <span className="fw-medium fst-italic">Razza</span>: {adoption.animal.breed}
                        <br />
                        <span className="fw-medium fst-italic">Status</span>:{" "}
                        {adoption.animal.status === "HOSPITALIZED" ? "Ricoverato" : adoption.animal.status === "RELEASED" ? "Rilasciato" : "Deceduto"}
                        <br />
                      </Card.Text>
                      <div className="d-flex justify-content-end details-btn-wrapper mt-3 mb-2">
                        <Link to={`/dettagli/${adoption.animal.id}`} className="ms-auto details-btn">
                          Dettagli
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
          )}
        </Row>
        <h4 className="subtitles mt-4 mb-2 ms-sm-3 ms-md-5">Adozioni concluse</h4>
        <Row className="gy-2 gx-2 w-100">
          {list.filter(adoption => adoption.status === "ENDED").length === 0 ? (
            <p className="mb-4 mt-2 ms-sm-3 ms-md-5">Non ci sono adozioni concluse al momento.</p>
          ) : (
            list
              .filter(adoption => adoption.status === "ENDED")
              .map(adoption => (
                <Col key={adoption.animal.id} xs={12} md={6}>
                  <Card className="d-flex flex-column flex-lg-row align-items-center justify-content-between mb-2 rounded-5 animal-card">
                    <Col className="text-center">
                      <Card.Img src={adoption.animal.imageUrl} className="mt-4 mt-lg-0 ms-4" />
                    </Col>
                    <Card.Body as={Col} className="d-flex flex-column justify-content-center align-items-center px-0">
                      <Card.Title className="text-center">{adoption.animal.name}</Card.Title>
                      <Card.Text>
                        <span className="fw-medium fst-italic">Sesso</span>: {adoption.animal.gender === "MALE" ? "Maschio" : "Femmina"}
                        <br />
                        <span className="fw-medium fst-italic">Specie</span>: {adoption.animal.species}
                        <br />
                        <span className="fw-medium fst-italic">Razza</span>: {adoption.animal.breed}
                        <br />
                        <span className="fw-medium fst-italic">Status</span>:{" "}
                        {adoption.animal.status === "HOSPITALIZED" ? "Ricoverato" : adoption.animal.status === "RELEASED" ? "Rilasciato" : "Deceduto"}
                        <br />
                      </Card.Text>
                      <div className="d-flex justify-content-end details-btn-wrapper mt-3 mb-2">
                        <Link to={`/dettagli/${adoption.animal.id}`} className="ms-auto details-btn">
                          Dettagli
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
          )}
        </Row>
        <h4 className="subtitles mt-4 mb-2 ms-sm-3 ms-md-5">Adozioni rifiutate</h4>
        <Row className="gy-2 gx-2 w-100">
          {list.filter(adoption => adoption.status === "DENIED").length === 0 ? (
            <p className="mb-4 mt-2 ms-sm-3 ms-md-5">Non ci sono adozioni rifiutate al momento.</p>
          ) : (
            list
              .filter(adoption => adoption.status === "DENIED")
              .map(adoption => (
                <Col key={adoption.animal.id} xs={12} md={6}>
                  <Card className="d-flex flex-column flex-lg-row align-items-center justify-content-between mb-2 rounded-5 animal-card">
                    <Col className="text-center">
                      <Card.Img src={adoption.animal.imageUrl} className="mt-4 mt-lg-0 ms-4" />
                    </Col>
                    <Card.Body as={Col} className="d-flex flex-column justify-content-center align-items-center px-0">
                      <Card.Title className="text-center">{adoption.animal.name}</Card.Title>
                      <Card.Text>
                        <span className="fw-medium fst-italic">Sesso</span>: {adoption.animal.gender === "MALE" ? "Maschio" : "Femmina"}
                        <br />
                        <span className="fw-medium fst-italic">Specie</span>: {adoption.animal.species}
                        <br />
                        <span className="fw-medium fst-italic">Razza</span>: {adoption.animal.breed}
                        <br />
                        <span className="fw-medium fst-italic">Status</span>:{" "}
                        {adoption.animal.status === "HOSPITALIZED" ? "Ricoverato" : adoption.animal.status === "RELEASED" ? "Rilasciato" : "Deceduto"}
                        <br />
                      </Card.Text>
                      <div className="d-flex justify-content-end details-btn-wrapper mt-3 mb-2">
                        <Link to={`/dettagli/${adoption.animal.id}`} className="ms-auto details-btn">
                          Dettagli
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
          )}
        </Row>
      </Container>
    </>
  );
};

export default AdoptionPage;
