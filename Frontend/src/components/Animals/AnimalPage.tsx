import { Button, Card, Container } from "react-bootstrap";
import "./animalPage.css";

const AnimalPage = () => {
  return (
    <>
      <Container id="animal-section" className="navbar-height information d-flex flex-column justify-content-start align-items-start">
        <h1 className="titles mx-auto mb-2 mt-4">Gli ospiti del Rifugio</h1>
        <p className="mb-4">
          Benvenuti nella nostra pagina dedicata agli animali che hanno trovato una casa nel Rifugio. Qui potrete scoprire le storie degli{" "}
          <span className="fw-bold">ospiti attuali e passati</span> del rifugio, animali che, a causa di infortuni, malattie o altre difficoltà, sono stati
          accolti e curati con amore e professionalità. <br />
          Ogni scheda racconta il loro percorso di recupero e riabilitazione, un viaggio verso la libertà che speriamo possiate seguire con noi. Vi invitiamo a
          esplorare le storie di questi straordinari animali e a conoscere più da vicino{" "}
          <span className="fw-bold">il nostro impegno nella tutela della fauna selvatica</span>.
        </p>
        <Card className="d-flex flex-column flex-md-row align-items-center w-100 mb-2">
          <Card.Img src="https://www.stfrancisanimalwelfare.co.uk/wp-content/uploads/placeholder-logo-3-300x300.png" />
          <Card.Body className="d-flex flex-column d-lg-block justify-content-center align-items-center">
            <Card.Title className="text-center">Nome Animale</Card.Title>
            <Card.Text>
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
              make a type specimen book.
            </Card.Text>
            <div className="d-flex justify-content-end details-btn-wrapper me-3 mt-3 mb-2">
              <Button variant="outline-none" className="ms-auto details-btn">
                Dettagli
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default AnimalPage;
