import { Col, Container, Image, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { articleCRUDFetch } from "../../redux/actions/articleSlice";
import { ArrowReturnLeft } from "react-bootstrap-icons";

const ArticleDetailPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { articleId } = useParams() as { articleId: string };
  const {
    data: { single },
  } = useAppSelector(state => state.articles);

  useEffect(() => {
    dispatch(articleCRUDFetch({ articleId, method: "GET", articleData: null }));
  }, [articleId, dispatch]);

  return (
    <>
      <Container id="article-details-section" className="navbar-height information d-flex flex-column justify-content-start align-items-center mb-4">
        {single !== null ? (
          <>
            <h1 className="titles text-center position-relative w-75 mt-3 px-5">
              {single && single.title} <ArrowReturnLeft className="go-back-btn d-none d-lg-block" onClick={() => navigate("/articoli")} />
            </h1>
            <h5 className="subtitles text-center">{`di ${single?.author.userName} ${single?.author.userSurname}`}</h5>
            <p className="subtitles mb-2">{new Date(single.publicationDate).toLocaleDateString()}</p>
            <Row className="d-flex flex-column justify-content-center align-items-center gy-3">
              <Col className="d-flex justify-content-center align-items-center">
                <Image src={single.articleImg} fluid className="rounded-5 animal-details-img" />
              </Col>

              <Col className=" mt-5 w-75">
                <pre className="article-content">{single.content}</pre>
              </Col>
            </Row>
          </>
        ) : (
          <>
            <p>Non c'è niente da vedere qui.</p>
          </>
        )}
      </Container>
    </>
  );
};

export default ArticleDetailPage;
