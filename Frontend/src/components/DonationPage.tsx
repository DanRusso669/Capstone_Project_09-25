import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import ImageSlide from "./ImageSlide";

const DonationPage = () => {
  return (
    <>
      <Container className="donation-section navbar-height information d-flex flex-column justify-content-start align-items-start">
        <h1 className="titles mx-auto mb-2 mt-3">Donazioni</h1>
        <p className="mb-4">
          Rifugio Mamo è un'organizzazione di volontariato che salva oltre 2000 animali selvatici ogni anno e oltre 200 animali domestici vivono all'interno del
          rifugio stesso.
          <br />
          L'associazione si occupa delle spese per il mantenimento del rifugio e per il soccorso degli animali selvatici, tra cui bollette, farmaci, veterinari,
          cibo, attrezzature e benzina. Le donazioni di persone che apprezzano e condividono quello che facciamo coprono al 90% tutti questi costi.
          <br />
          <br />
          <span className="fw-bold">Senza donazioni, Rifugio Mamo non potrebbe esistere.</span>
        </p>
      </Container>
      <div className="donation-methods text-center mx-2 mx-md-auto mb-5">
        <p>
          Puoi donare con{" "}
          <Link to={"https://www.paypal.com/paypalme/rifugiomiletta"} target="_blank">
            PayPal
          </Link>
          ,{" "}
          <Link to={"https://web.satispay.com/download/qrcode/S6Y-SHP--8A154D79-0A86-4C4B-896B-FEF685293982"} target="_blank">
            Satispay
          </Link>{" "}
          o con bonifico <span className="fw-bold">IBAN</span> :
        </p>
        <p className="iban my-2">IT22R1234567800000067898765</p>
        <p>
          Nella causale puoi inserire la tua preferenza di utilizzo della donazione.
          <br />
          Le donazioni possono essere detratte nella dichiarazione dei redditi (ad esclusione di quelle effettuate con Satispay*)
        </p>
      </div>
      <ImageSlide
        firstImg="https://www.rifugiomiletta.org/wp-content/uploads/2017/09/rifugio-miletta-20170128-173956-_K2A0284.jpg"
        secondImg="https://www.rifugiomiletta.org/wp-content/uploads/2017/09/rifugio-miletta-20160605-134141-_K2A6074.jpg"
        thirdImg="https://images.pexels.com/photos/19080424/pexels-photo-19080424.jpeg"
      />
      <Container className="donation-section information d-flex flex-column justify-content-start align-items-start mb-4">
        <h4 className="subtitles my-2">Diventa sostenitore</h4>
        <p className="mb-4">
          Se hai deciso di aiutarci con una donazione a mantenere e curare gli animali salvati e selvatici: <span className="fw-bold">GRAZIE!</span> <br />
          <br />
          Rifugio Mamo deve sostenere le spese di mantenimento degli animali tutti i mesi. Valuta di diventare sostenitore dell’associazione con{" "}
          <span className="fw-bold">una donazione mensile</span> secondo le tue possibilità. In questo modo contribuisci a garantire un futuro certo a tutti gli
          animali che vivono al rifugio.
        </p>
        <div className="w-100 d-flex justify-content-center align-items-start mb-4">
          <Link to={"/donazione-mensile"} className="month-donation-btn">
            Sostieni il rifugio
          </Link>
        </div>
        <p>
          <span className="fw-bold">* Per alcune persone potrebbe essere importante sapere che</span> attualmente le donazioni effettuate attraverso{" "}
          <span className="fw-bold">Satispay</span> non possono essere inserite nella dichiarazione dei redditi perché ci arrivano in modo “anonimo”, non
          possiamo quindi associarle ad una persona.
        </p>
      </Container>
    </>
  );
};

export default DonationPage;
