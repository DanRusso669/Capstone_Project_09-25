import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <>
      <Container fluid className="mt-4">
        <Row className="footer flex-column justify-content-center align-items-center">
          <Col sm={12} className="information mt-3">
            <Row className="align-items-center justify-content-center ">
              <Col xs={4} sm={4} md={1} className="footer-links text-center">
                Il C.R.A.S.
              </Col>
              <Col xs={4} sm={4} md={1} className="footer-links text-center">
                Donazioni
              </Col>
              <Col xs={4} sm={4} md={1} className="footer-links text-center">
                Chi siamo
              </Col>
              <Col xs={4} sm={4} md={1} className="footer-links text-center">
                Volontariato
              </Col>
              <Col xs={4} sm={4} md={1} className="footer-links text-center">
                Privacy Policy
              </Col>
              <Col xs={4} sm={4} md={1} className="footer-links text-center">
                Cookie Policy
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={8} className="d-flex align-items-center justify-content-center my-3">
            <Row className="flex-column ">
              <Col className="information text-center">
                <p>Rifugio Mamo ETS - Via delle Rose, 50 - 28100 Novara (NO) - C.F. 12345678987 - PEC: rifugiomamo@pec.it</p>
              </Col>
              <Col className="information text-center border-top border-dark mt-2 pt-2">
                <p>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Footer;
