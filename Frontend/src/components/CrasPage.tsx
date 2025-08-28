import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const CrasPage = () => {
  return (
    <>
      <Container className="cras-section navbar-height d-flex flex-column justify-content-center align-items-start information mb-4">
        <h1 className="titles mx-auto mb-2 mt-4 text-center">Centro di Recupero per Animali Selvatici</h1>
        <p className="ms-sm-3 ms-md-5">
          Quando si parla di <span className="fw-bold">C.R.A.S.</span> ci si riferisce a strutture, solitamente gestite da enti come Regione, Comuni, enti parco
          o associazioni (WWF, ENPA), che si occupano del recupero, della cura e della riabilitazione degli animali selvatici autoctoni trovati in difficoltà.
          <br /> L'obiettivo principale è restituire la libertà agli animali selvatici, dopo averli curati, riabilitati e aver verificato la loro idoneità per
          il rientro in natura.
        </p>
        <h4 className="subtitles mt-4 mb-2 ms-sm-3 ms-md-5">Come operiamo</h4>
        <p className="ms-sm-3 ms-md-5">
          Il cittadino svolge un ruolo cruciale come primo anello della catena di pronto intervento. Segnalando tempestivamente il ritrovamento di un animale
          ferito o in difficoltà al <span className="fw-bold">numero unico di emergenza 112 o al nostro numero dedicato</span>, consente ai volontari di
          intervenire in modo rapido e preciso. Spesso una chiamata può essere molto incisiva sulla sopravvivenza dell'animale anche a seconda del tempo di
          attesa tra il ritrovamento e la chiamata effettiva.
          <br /> <br />
          <span className="fw-bold">Le volontarie e i volontari di Rifugio Mamo effettuano il soccorso sul luogo</span> del ritrovamento / incidente per
          <span className="fw-bold"> caprioli, daini, cervi, cinghiali, tassi, volpi ed in genere mammiferi di grossa taglia</span> investiti, feriti, malati,
          incastrati in reti… <br /> <br />
          <span className="fw-bold">Tutti gli uccelli e i mammiferi di piccola taglia</span> (come ad esempio i ricci, rondoni, scoiattoli etc.){" "}
          <span className="fw-bold">devono essere portati al nostro centro</span> dal privato che li ritrova, dopo averci contattato preventivamente.
          <br />
          <br /> <span className="fw-bold">Il cittadino che segnala un animale non ha spese a carico relative all'assistenza e alle cure.</span> Se la
          segnalazione riguarda un mammifero di grandi dimensioni, è categorigo che attenda l’arrivo dei volontari sul posto. Diversamente, nel caso di fauna di
          piccola taglia, chi ritrova l’animale deve occuparsi di raccoglierlo e portarlo direttamente al rifugio.
          <br />
          <br />
          Per ogni animale selvatico soccorso viene realizzata una <span className="fw-bold">scheda di accettazione</span>, visibile anche dalla persona che ha
          richiesto l’intervento, che permette non solo una gestione puntuale di ogni singolo paziente, ma anche di avere sempre a disposizione la situazione
          complessiva.
        </p>
        <h4 className="subtitles mt-4 mb-2 ms-sm-3 ms-md-5">Cosa fare in caso di ritrovamento di un animale</h4>
        <p className="ms-sm-3 ms-md-5">
          Leggi i nostri{" "}
          <Link className="cras-links" to={"/cosa-fare"}>
            approfondimenti
          </Link>{" "}
          per affrontare una situazione di emergenza nel modo corretto oppure consulta le{" "}
          <Link className="cras-links" to={"/faq"}>
            domande frequenti
          </Link>{" "}
          che ci vengono poste.
          <br />
          <br />
          <span className="fw-bold">Nota molto importante</span>: controlla{" "}
          <Link className="cras-links" to={"https://elencocras.it/"}>
            il C.R.A.S. di competenza
          </Link>{" "}
          nella zona dove trovi l'animale.
        </p>
      </Container>
    </>
  );
};

export default CrasPage;
