import { Button, Card, Col, Container, Row } from "react-bootstrap";

const Articles = () => {
  return (
    <>
      <Container>
        <Row className="main-section g-3 mt-4">
          <Col sm={12} md={6} xl={3}>
            <Card className="d-flex justify-content-center align-items-center rounded-4" id="who-are-we">
              <Card.Img
                className="rounded-top-4"
                title="Lepre"
                alt="Lepre"
                variant="top"
                src="https://images.unsplash.com/photo-1480554840075-72cbdabbf689?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGVwcmV8ZW58MHx8MHx8fDA%3D"
              />
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Card.Title className="text-center">Chi siamo</Card.Title>
                <Card.Text className="d-flex flex-column justify-content-center align-items-center text-center mb-3">
                  Rifugio Mamo nasce dall'impegno di volontari, veterinari e non, per...
                </Card.Text>
                {/* TODO - Far diventare questo Button un Link */}
                <Button className="btn shadow-none btn-link learn-more-btn">Approfondisci</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={6} xl={3}>
            <Card className="d-flex justify-content-center align-items-center rounded-4" id="what-do-we">
              <Card.Img
                className="rounded-top-4"
                title="Recupero notturno cerbiatto a bordo strada."
                alt="Recupero notturno cerbiatto a bordo strada."
                variant="top"
                src="https://www.rifugiomiletta.org/wp-content/uploads/2025/05/investimento-ungulato-1024x576.jpg"
              />
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Card.Title>Cosa facciamo</Card.Title>
                <Card.Text className="text-center mb-3">
                  Ogni giorno, e ogni notte, soccorriamo animali di ogni specie che ci vengono segnalati dai cittadini...
                </Card.Text>
                {/* TODO - Far diventare questo Button un Link */}
                <Button className="btn shadow-none btn-link learn-more-btn">Approfondisci</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={6} xl={3}>
            <Card className="d-flex justify-content-center align-items-center rounded-4" id="why-do-we">
              <Card.Img
                className="rounded-top-4"
                title="Due volpi cucciole che giocano. "
                alt="Due volpi cucciole che giocano. "
                variant="top"
                src="https://plus.unsplash.com/premium_photo-1664299499486-0855b1d9e22d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHZvbHBlfGVufDB8fDB8fHww"
              />
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Card.Title>Perchè lo facciamo</Card.Title>
                <Card.Text className="text-center mb-3">Ogni animale merita una vita libera che è stata interrotta dall'incontro...</Card.Text>
                {/* TODO - Far diventare questo Button un Link */}
                <Button className="btn shadow-none btn-link learn-more-btn">Approfondisci</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={6} xl={3}>
            <Card className="d-flex justify-content-center align-items-center rounded-4" id="why-do-we">
              <Card.Img
                className="rounded-top-4"
                title="Due volpi cucciole che giocano. "
                alt="Due volpi cucciole che giocano. "
                variant="top"
                src="https://plus.unsplash.com/premium_photo-1722054523059-357d2d1c03fb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Card.Title>Diventa Volontario</Card.Title>
                <Card.Text className="text-center mb-3">Abbiamo sempre bisogno di qualche mano in più.</Card.Text>
                {/* TODO - Far diventare questo Button un Link */}
                <Button className="btn shadow-none btn-link learn-more-btn">Candidati</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Articles;
