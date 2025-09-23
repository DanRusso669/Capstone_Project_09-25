import { Col, Container, Image, Row } from "react-bootstrap";
import Article from "./Article";
import "./homepage.css";

const MainSection = () => {
  return (
    <>
      <Container>
        <div className="d-flex flex-column align-items-center justify-content-center who-are-we my-5">
          <h3 className="mb-4">Chi siamo</h3>
          <Row className="d-flex justify-content-center ">
            <Col sm={12} md={6}>
              <p>
                Il Rifugio Mamo nasce dalla volontà e l'impegno di volontari, veterinari e non, che hanno in comune una cosa: l'amore per gli animali e
                l'ambiente.
                <br /> Nasce dall'idea di voler creare{" "}
                <span className="fw-bold">un posto sicuro per tutti gli animali che hanno visto la loro libertà sparire dopo l'incontro con l'uomo.</span>{" "}
                <br /> Dal 2015 accogliamo qualsiasi specie abbia bisogno di cure senza discriminazione alcuna. Ogni giorno, e ogni notte, effettuiamo
                interventi per recupero di animali feriti, soprattuto dovuti a investimenti.
              </p>
            </Col>
            <Col sm={12} md={6}>
              <p>
                Dal 2018 siamo <span className="fst-italic">Centro di Recupero Animali Selvatici</span>, operativo in provincia di Novara, ma disponibile ad
                accogliere animali selvatici anche da territori extra-provinciali.
                <br /> <span className="fw-bold">Dal 2020 soccorriamo più di 2000 animali selvatici all'anno</span> grazie alle forze dei nostri volontari e
                alle tempestive chiamate dei cittadini che affidano a noi la salvaguardia della fauna locale. Attraverso cure e riabilitazione cerchiamo di
                garantire a chiunque il ritorno in libertà, ma per chi non è possibile, Rifugio Mamo diventa casa per sempre.
              </p>
            </Col>
          </Row>
        </div>
      </Container>
      <div id="middle-img">
        <Image fluid className="object-fit-contain" src="https://images.pexels.com/photos/17867770/pexels-photo-17867770.jpeg" />
      </div>
      <Container className="mb-4 d-flex flex-column justify-content-center align-items-center align-items-xxl-start">
        <h3 className="ms-2 mt-4 mb-3 mb-xl-0 news-subtitle py-1">Ultimi articoli</h3>
        <Article />
      </Container>
    </>
  );
};

export default MainSection;
