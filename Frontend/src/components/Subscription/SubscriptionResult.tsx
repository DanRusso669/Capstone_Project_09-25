import { Container, Image } from "react-bootstrap";
import "./subscription.css";
import { Link } from "react-router-dom";

const SubscriptionResult = () => {
  const isSubPositive = window.location.href.includes("/abbonamento/effettuato");

  return (
    <>
      <Container id="subscription-section" className="navbar-height d-flex flex-column justify-content-start align-items-center information">
        <h1 className="titles mx-auto mb-2 mt-4 text-center">Esito abbonamento sostenitore</h1>
        {isSubPositive ? (
          <>
            <p>
              Evviva! L'abbonamento è confermato! 🐾❤️
              <br />
              <span className="fw-semibold">Sei ufficialmente un sostenitore/trice del Rifugio Mamo</span>
            </p>
            <p>
              Siamo felicissimi di comunicarti che la transazione è andata a buon fine. La tua scelta{" "}
              <span className="fst-italic fw-semibold">non è solo un abbonamento</span>, ma un atto d'amore che darà la libertà a tanti esseri viventi in attesa
              al rifugio. <br />
              Grazie per essere un eroe per loro! <br />
              Un ringraziamento da tutto lo staff e da tutti i rifugiati del Rifugio Mamo.
            </p>
          </>
        ) : (
          <p>
            <span className="subtitles fw-bold fs-3">Ops, c'è stato un intoppo!</span> 😔 <br /> Il tuo abbonamento non è stato ancora attivato a causa di un
            problema di pagamento. <br /> Per favore, torna sulla{" "}
            <Link to="/donazione-mensile" className="subscription-link">
              pagina degli abbonamenti
            </Link>{" "}
            e prova a inserire nuovamente i tuoi dati. <br /> <br /> Se l'errore persiste, controlla che i dati della carta siano corretti. <br />
            Non vediamo l'ora di avere anche te al nostro fianco per dare libertà a tanti animali bisognosi. 🐾❤️
          </p>
        )}
        {isSubPositive ? (
          <Image
            className="rounded-4 subscription-img mt-3 mb-4"
            fluid
            src="https://plus.unsplash.com/premium_photo-1664371674939-d3ff57800903?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1169"
          />
        ) : (
          <Image className="subscription-img mt-3 mb-4" fluid src="https://ethology.eu/wp-content/uploads/2018/09/Sad-Dog-on-Hardwood-Floor.jpg" />
        )}
      </Container>
    </>
  );
};

export default SubscriptionResult;
