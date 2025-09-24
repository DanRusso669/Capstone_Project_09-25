import { Container } from "react-bootstrap";
import AnimalForm from "./AnimalForm";
import ArticleForm from "./ArticleForm";

const UpdatePage = () => {
  const isArticlePage = location.pathname.includes("/modifica/articoli");

  return (
    <>
      <Container id="back-office-update-section" className="navbar-height d-flex flex-column justify-content-start align-items-start information">
        <h2 className="titles mx-auto mb-2 mt-4">{isArticlePage ? "Articoli" : "Animali"}</h2>
        <h4 className="subtitles mx-auto">{isArticlePage ? "Modifica un articolo" : "Modifica un animale"}</h4>
        {isArticlePage ? <ArticleForm /> : <AnimalForm />}
      </Container>
    </>
  );
};

export default UpdatePage;
