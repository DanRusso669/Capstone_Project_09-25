import { Col, Image, Row } from "react-bootstrap";

interface ImageUrls {
  firstImg: string;
  secondImg: string;
  thirdImg: string;
}

const ImageSlide = (props: ImageUrls) => {
  return (
    <>
      <div className="mb-4">
        <Row className="g-0">
          <Col className="d-none d-sm-inline">
            <Image fluid className="img-slide" src={props.firstImg} alt="ciao" />
          </Col>
          <Col>
            <Image fluid className="img-slide" src={props.secondImg} alt="ciao" />
          </Col>
          <Col className="d-none d-lg-inline">
            <Image fluid className="img-slide" src={props.thirdImg} alt="ciao" />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ImageSlide;
