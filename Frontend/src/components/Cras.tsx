import { Container } from "react-bootstrap";

const Cras = () => {
  return (
    <>
      <Container className="d-flex flex-column justify-content-center align-items-start information my-4">
        <h2 className="mx-auto mb-2">Centro di Recupero per Animali Selvatici</h2>
        <p>
          Quando si parla di <span className="fw-bold">C.R.A.S.</span> ci si riferisce a strutture, solitamente gestite da enti come Regione, Comuni, enti parco
          o associazioni (WWF, ENPA), che si occupano del recupero, della cura e della riabilitazione degli animali selvatici autoctoni trovati in difficoltà.
          <br /> L'obiettivo principale è restituire la libertà agli animali selvatici, dopo averli curati, riabilitati e aver verificato la loro idoneità per
          il rientro in natura.
        </p>
        <h4 className="mt-4 mb-2">Come operiamo</h4>
        <p>
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
          Per ogni animale selvatico soccorso viene realizzata una scheda di accettazione, visibile anche dalla persona che ha richiesto l’intervento, che
          permette non solo una gestione puntuale di ogni singolo paziente, ma anche di avere sempre a disposizione la situazione complessiva.
        </p>
      </Container>
    </>
  );
};

export default Cras;
