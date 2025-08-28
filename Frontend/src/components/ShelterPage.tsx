import { Col, Container, Row } from "react-bootstrap";

const ShelterPage = () => {
  return (
    <>
      <Container fluid className="shelter-intro d-flex flex-column justify-content-center align-items-center">
        <Row>
          <Col xs={1} md={2} lg={3} xl={4} className="d-none d-md-block"></Col>
          <Col xs={10} md={8} lg={6} xl={4} className="shelter-paragraph information d-flex flex-column justify-content-center align-items-center mx-5 my-4">
            <h1 className="mt-4">Il Rifugio</h1>
            <p className="text-center m-4">
              La parte di "rifugio" è la casa dei Rifugiati: <span className="fw-bold">animali salvati da situazioni di pericolo, disagio o sfruttamento</span>.{" "}
              <br /> <br />
              Per coloro che non possono essere rimessi in libertà in sicurezza, il rifugio diventa casa per sempre.
              <br /> A Rifugio Mamo convivono in armonia <span className="fw-bold">più di 300 specie</span>, ciascuna con la propria storia. <br /> <br /> Nei 3
              ettari che compongono il rifugio ci sono poche recinzioni, a parte quella esterna, in modo che la maggior parte degli animali viva insieme, come
              una grande famiglia.
              <br /> <br />
              Pecore, maiali, cinghiali, capre, cavalli, asini, mucche, cani, gatti, oche… individui e parte di una molteplicità che ogni giorno ribadiscono e
              comunicano <span className="fw-bold">il diritto e la volontà di essere liberi e felici</span>.
            </p>
          </Col>
          <Col xs={1} md={2} lg={3} xl={4} className="d-none d-md-block"></Col>
        </Row>
      </Container>
    </>
  );
};

export default ShelterPage;
