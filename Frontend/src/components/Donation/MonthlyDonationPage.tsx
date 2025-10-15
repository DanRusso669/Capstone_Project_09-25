import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "./donation.css";
import { toast } from "react-toastify";

const MonthlyDonationPage = () => {
  const accessToken = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user")!);

  const plans = [
    {
      name: "Sostenitore Base",
      price: "10 €",
      priceId: "price_1SIPu5E3YwyyMp3lRJLZWHzD",
      feature: "Con questo piano riuscirai a salvare una vita all'anno.",
    },
    {
      name: "Sostenitore Extra",
      price: "20 €",
      priceId: "price_1SIPuWE3YwyyMp3lyibKnlki",
      feature: "Con questo piano riuscirai a salvare due vite all'anno.",
    },
    {
      name: "Sostenitore Ultra",
      price: "30 €",
      priceId: "price_1SIPusE3YwyyMp3l7IM5YQ9D",
      feature: "Con questo piano riuscirai a salvare tre vite all'anno.",
    },
  ];

  // Subscribe Method

  const handleSubscription = async (priceId: string) => {
    try {
      const response = await fetch("http://localhost:3001/api/subscriptions/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          priceId: priceId,
          successUrl: `http://localhost:5173/abbonamento/effettuato`,
          cancelUrl: `http://localhost:5173/abbonamento/fallito`,
          userEmail: user.userEmail,
        }),
      });

      if (!response.ok) {
        throw new Error("Errore nella creazione della sessione");
      }

      const { url } = await response.json();

      if (url) {
        // reindirizza l'utente all'URL del checkout di stripe
        window.location.href = url;
      } else {
        throw new Error("URL di Checkout non ricevuto");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Errore durante la sottoscrizione");
    }
  };

  return (
    <>
      <Container id="monthly-donation-section" className="navbar-height d-flex flex-column justify-content-center align-items-center information">
        <h1 className="titles mx-auto mb-2 mt-4">Sostieni il Rifugio Mamo</h1>
        <div className="monthly-donation-incipit text-center mx-2 mx-md-auto mb-4">
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
        <h2 className="subtitles mx-auto mb-2">Unisciti ad altri sostenitori</h2>
        <p className="mb-3">
          Scegli uno dei 3 possibili piani qui sotto e ricorda che qualsiasi tipo di donazione, anche la più piccola,{" "}
          <span className="fw-bold">può fare la differenza</span>.
        </p>
        <Row className="mb-4 gap-3 justify-content-center">
          {plans.map(plan => (
            <Card key={plan.name} as={Col} xs={12} lg={4} className="text-center rounded-4 plan-card">
              <Card.Body>
                <Card.Title className="subtitles fs-3">{plan.name}</Card.Title>
                <Card.Text className="fw-bold fst-italic fs-3">{plan.price}</Card.Text>
                <Card.Text className="px-4">{plan.feature}</Card.Text>
                <Button className="monthly-payment-btn mt-3 mb-2" variant="outline-none" onClick={() => handleSubscription(plan.priceId)}>
                  Sostieni
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default MonthlyDonationPage;
