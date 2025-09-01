import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <Container fluid>
        <Row className="footer flex-column justify-content-center align-items-center">
          <Col sm={12} className="information mt-3">
            <Row className="align-items-center justify-content-center ">
              <Col xs={4} sm={4} md={4} lg={2} xl={1} className="text-center">
                <Link to={"/cras"} className="footer-links">
                  Il C.R.A.S.
                </Link>
              </Col>
              <Col xs={4} sm={4} md={4} lg={2} xl={1} className="text-center">
                <Link to={"/donazioni"} className="footer-links">
                  Donazioni
                </Link>
              </Col>
              <Col xs={4} sm={4} md={4} lg={2} xl={1} className="text-center">
                <Link to={"/rifugio"} className="footer-links">
                  Chi siamo
                </Link>
              </Col>
              <Col xs={4} sm={4} md={4} lg={2} xl={1} className="text-center">
                <Link to={"/volontariato"} className="footer-links">
                  Volontariato
                </Link>
              </Col>
              <Col xs={4} sm={4} md={4} lg={2} xl={1} className="text-center">
                <Link to={"/privacy"} className="footer-links">
                  Privacy Policy
                </Link>
              </Col>
              <Col xs={4} sm={4} md={4} lg={2} xl={1} className="text-center">
                <Link to={"/cookies"} className="footer-links">
                  Cookie Policy
                </Link>
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
