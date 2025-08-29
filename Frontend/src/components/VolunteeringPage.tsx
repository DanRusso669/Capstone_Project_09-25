import { Container } from "react-bootstrap";

const VolunteeringPage = () => {
  return (
    <>
      <Container className="volunteering-section navbar-height d-flex flex-column justify-content-center align-items-start information mb-4">
        <h1 className="titles mx-auto mb-2 mt-4">Volontariato</h1>
        <p className="fw-bold mx-auto text-center">Il tempo è il dono più prezioso che puoi donare agli animali e più siamo, più animali possiamo aiutare.</p>
        <p className="time-value ms-sm-3 ms-md-5 my-4 ps-4 pe-3 py-3">
          Prima di tutto grazie di aver anche solo provato interesse nell'informati come funziona il volontariato. <br />
          <span className="fw-bold">Il Rifugio non si ferma mai</span>: per noi non esistono ferie, vacanze, pioggia, caldo o freddo. La vita al rifugio è 365
          giorni su 365 all'anno, soprattutto a causa delle continue emergenze ed eventi straordinari. Siamo qui per regalare una nuova vita serena agli animali
          e la loro serenità ed energia sono la nostra forza. Gli animali che risiedono nel rifugio e quelli in libertà hanno bisogno{" "}
          <span className="fw-bold">tutti i giorni</span> di persone volenterose di aiutarli e che si impegnino a garantire loro una vita degna di essere
          vissuta, liberi di impegnare il proprio tempo come meglio credono, ma sicuri di mantenere l'impegno nonostante la stanchezza e momenti di difficoltà
          emotiva e/o fisica.
        </p>
        <h4 className="subtitles mt-2 mb-2 ms-sm-3 ms-md-5">Il volontariato è consapevolezza e responsabilità</h4>
        <p className="ms-sm-3 ms-md-5">
          L’emozione, l’amore, la buona volontà… servono tutti, ma non basta:{" "}
          <span className="fw-bold">il volontariato è un dono che si basa sulla consapevolezza, sulla serietà e sulla preparazione.</span>
          <br />
          Il fatto che sia privo di compenso non lo rende automaticamente un impegno da prendere alla leggera; significa rendersi disponibili ad imparare da chi
          ha più esperienza e darsi da fare per qualcuno che ha bisogno di noi seguendo sempre i loro tempi.
          <br />
          Se pensi quindi che il volontariato sia fare quello che vuoi quando vuoi, ci dispiace ma forse questo non è il posto giusto per te. Se invece vuoi e
          puoi garantire un <span className="fw-bold">impegno costante</span> per aiutare centinaia di che dipendono da noi, allora sei sulla buona strada.
        </p>
        <h4 className="subtitles mt-4 mb-2 ms-sm-3 ms-md-5">Inviaci la tua candidatura</h4>
        <p className="ms-sm-3 ms-md-5">
          Tramite la nostra email <span className="fw-bold">rifugio-mamo@cras-no.it</span> puoi inviarci la tua candidatura inserendo i seguenti punti:
        </p>
        <ul className="ms-md-5">
          <li>Breve presentazione;</li>
          <li>Motivazione della scelta di fare volontariato da noi;</li>
          <li>Breve spiegazione di come potresti migliorare l'esperienza al rifugio;</li>
          <li>Residenza - per capire la tua tempistica per raggiungere il rifugio;</li>
        </ul>
        <p className="ms-sm-3 ms-md-5">
          Se questa prima parte dovesse avere esito positivo, ti contatteremo per organizzare un incontro direttamente qui al rifugio, per conoscere meglio te e
          per farti conoscere meglio l'ambiente con cui avrai a che fare.
        </p>
      </Container>
    </>
  );
};

export default VolunteeringPage;
