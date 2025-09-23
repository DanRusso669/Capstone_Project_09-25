import { Container } from "react-bootstrap";
import Article from "./Article";
import "./article.css";

const ArticlePage = () => {
  return (
    <>
      <Container id="articles-section" className="navbar-height d-flex flex-column justify-content-start align-items-start information mb-4">
        <h1 className="titles mx-auto mb-2 mt-4">Gli articoli del Rifugio</h1>
        <p className="mb-4 text-center w-100">
          Questa pagina è dedicata ad articoli che riguardano il Rifugio Mamo e tutto il mondo di cui fa parte.
          <br />
          Si possono trovare informazioni sull'ambiente, istruzioni su come comportarsi in una situazione di emergenza e molto altro.
        </p>
        <Article />
      </Container>
    </>
  );
};

export default ArticlePage;
