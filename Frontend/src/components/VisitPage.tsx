import { Container } from "react-bootstrap";
import ImageSlide from "./ImageSlide";
import { Link } from "react-router-dom";

const VisitPage = () => {
  return (
    <>
      <Container className="navbar-height d-flex flex-column justify-content-center align-items-start information">
        <h1 className="titles mx-auto mb-2 mt-4">Visitare il Rifugio Mamo</h1>
        <p className="ms-sm-3 ms-md-5">
          Visitare il rifugio Mamo è possibile, ma solo seguendo delle specifiche e rigorose regole per{" "}
          <span className="fw-bold">tutelare la salute dei nostri ospiti</span>.
        </p>
        <h4 className="subtitles ms-sm-3 ms-md-5 mt-3 mb-2">Cosa portare</h4>
        <p className="ms-sm-3 ms-md-5">
          Questo è il materiale necessario per l'entrata al rifugio. Ricordatevi che è pur sempre un luogo abitato da animali, domestici e non.
        </p>
        <ul className="ms-sm-3 ms-md-5">
          <li>
            <span className="fst-italic fw-semibold">Scarponi o stivali in gomma</span> 🥾 - Nei giorni di pioggia i percorsi si riempieno di fango, quindi
            servono calzature comode.
          </li>
          <li>
            <span className="fst-italic fw-semibold">K-way o giacca impermeabile</span> 🧥 - Sempre in caso di pioggia, fondamentale perchè ci saranno pochi
            spazi chiusi da visitare.
          </li>
          <li>
            <span className="fst-italic fw-semibold">Cappello e crema solare</span> 🌞 - Al contrario, nei giorni di sole è meglio proteggersi al meglio.
          </li>
          <li>
            <span className="fst-italic fw-semibold">Abiti pratici e resistenti</span> 👖 - Non si camminerà molto, ma meglio stare comodi.
          </li>
          <li>
            <span className="fst-italic fw-semibold">Macchina fotografica / Telefoni</span> 📷 - Si possono fare foto, ma rigorosamente{" "}
            <span className="fw-bold">senza l'utilizzo del flash</span>.
          </li>
          <li>
            <span className="fst-italic fw-semibold">Acqua</span> 💧 - Rimanere idratati è fondamentale.{" "}
          </li>
        </ul>
        <h4 className="subtitles ms-sm-3 ms-md-5 mt-2 mb-2">Cosa NON portare e cosa NON fare</h4>
        <p className="ms-sm-3 ms-md-5">
          Questo sono il materiale e i comportamenti <span className="fw-bold">vietati</span> all'interno del rifugio per vari motivi, in primis la sicurezza
          dei volontari e degli animali.
        </p>
        <ul className="ms-sm-3 ms-md-5">
          <li>
            <span className="fst-italic fw-semibold">Cibo</span> - È vietato qualsiasi tipo di alimento (snack, patatine, cracker).
          </li>
          <li>
            <span className="fst-italic fw-semibold">Dare cibo agli animali</span> - È assolutamente vietato dare da mangiare agli animali, a meno che non sia
            una guida del rifugio a dirvi che è possibile.
          </li>
          <li>
            <span className="fst-italic fw-semibold">Armi</span> - Per ovvie ragioni e sono compresi anche coltellini multiuso (coltellino svizzero).
          </li>
          <li>
            <span className="fst-italic fw-semibold">Spaventare gli animali</span> - Ricordatevi che questo è un luogo di riposo e riabilitazione, gli
            schiamazzi non saranno tollerati.
          </li>
          <li>
            <span className="fst-italic fw-semibold">Animali domestici</span> - Vietato portare animali domestici all'interno del rifugio, a meno che non siano
            cani di assistenza.
          </li>
          <li>
            <span className="fst-italic fw-semibold">Allontanarsi</span> - Non allontanatevi dal gruppo di visita e soprattutto dalla guida.
          </li>
        </ul>
      </Container>
      <ImageSlide
        firstImg="https://images.unsplash.com/photo-1597214840472-aa1eaf0e1fac?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        secondImg="https://www.rifugiomiletta.org/wp-content/uploads/2017/09/rifugio-miletta-20170107-161817-_K2A5797-1.jpg"
        thirdImg="https://www.rifugiomiletta.org/wp-content/uploads/2017/09/rifugio-miletta-20170409-154815-3K2A4383.jpg"
      />
      <Container className="d-flex flex-column justify-content-center align-items-start information mb-4">
        <h4 className="subtitles ms-sm-3 ms-md-5 mb-2">Cosa vedrai</h4>
        <p className="ms-sm-3 ms-md-5">
          Vi mostreremo principalmente come e dove vivono gli ospiti del rifugio, illustrandovi da vicino gli ambienti in cui vengono accolti e le loro routine
          quotidiane. Avrete modo di scoprire come si svolge una classica giornata all’interno del centro, tra cure, alimentazione e momenti di tranquillità.
          <br />
          Durante la visita, vi sveleremo anche le nostre procedure di soccorso su strada: cosa accade quando riceviamo una chiamata per il recupero di un
          animale in difficoltà, come interveniamo sul posto e quali sono le successive fasi di accoglienza, controllo veterinario, cura e riabilitazione.{" "}
          <br />
          Non mancherà infine una breve lezione informativa su come comportarsi correttamente in caso di ritrovamento di un animale selvatico a bordo strada,
          per sapere cosa fare e cosa evitare in situazioni delicate.
        </p>
        <h4 className="subtitles ms-sm-3 ms-md-5 mt-3 mb-2">Prenota la tua visita</h4>
        {/* TODO - Creare il calendario e la sua pagina */}
        <p className="ms-sm-3 ms-md-5">
          Se sei d'accordo con tutti gli obblighi e i divieti citati in alto, allora continua pure verificando la disponibilità per la tua visita nel nostro{" "}
          <Link className="calendar" to={"/calendario-visite"}>
            calendario
          </Link>{" "}
          .
        </p>
      </Container>
    </>
  );
};

export default VisitPage;
