import { Button, Card, Col, Row } from "react-bootstrap";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { allArticleFetch } from "../../redux/actions/articleSlice";
import "./article.css";

const Article = () => {
  const dispatch = useAppDispatch();
  const {
    data: { list },
  } = useAppSelector(state => state.articles);

  useEffect(() => {
    dispatch(allArticleFetch());
  }, [dispatch]);

  return (
    <>
      <Row className="articles-section g-4">
        {list &&
          list.map(article => (
            <Col key={article.id} xs={12} sm={6} md={6} lg={3} className="d-flex justify-content-center align-items-center">
              <Card className="d-flex justify-content-center align-items-center rounded-4 article-cards">
                <Card.Img className="rounded-top-4 article-imgs" title={article.title} alt={article.title} variant="top" src={article.image} />
                <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                  <Card.Title className="text-center article-title">{article.title}</Card.Title>
                  <Card.Text className="d-flex flex-column justify-content-center align-items-center text-center mb-3">
                    {article.content.slice(0, 26) + "..."}
                  </Card.Text>
                  {/* TODO - Far diventare questo Button un Link */}
                  <Button className="btn shadow-none btn-link learn-more-btn">Approfondisci</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default Article;
