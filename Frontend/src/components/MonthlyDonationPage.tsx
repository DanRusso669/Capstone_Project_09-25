import { Container } from "react-bootstrap";

const MonthlyDonationPage = () => {
  return (
    <>
      <Container className="navbar-height d-flex flex-column justify-content-center align-items-start information mb-4">
        <h1 className="titles mx-auto mb-2 mt-3">Sostieni il Rifugio Mamo</h1>
        <div className="monthly-donation-incipit text-center mx-2 mx-md-auto mb-5">
          <p>
            Ogni giorno, migliaia di animali selvatici e domestici, affrontano situazioni critiche: incidenti, abbandoni o maltrattamenti li mettono in
            pericolo.
            <br />
            <br /> Con una donazione minima di 5 euro al mese, puoi davvero fare la differenza e offrire loro una possibilità reale di sopravvivenza. Ci
            impegniamo ogni giorno per garantire cure, protezione e amore a ogni animale che accogliamo, con la speranza di restituirgli una vita dignitosa e
            serena. <br />
            <br />
            <span className="fw-bold">Il tuo contributo regolare può trasformare questa speranza in realtà, ogni singolo giorno.</span>
          </p>
        </div>
        <h2 className="subtitles mx-auto">Unisciti agli altri sostenitori</h2>
      </Container>
    </>
  );
};

export default MonthlyDonationPage;
