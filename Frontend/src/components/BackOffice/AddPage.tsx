import { Container } from "react-bootstrap";
import AnimalForm from "./AnimalForm";
import ArticleForm from "./ArticleForm";
import { Link } from "react-router-dom";
import { ArrowReturnLeft } from "react-bootstrap-icons";

const AddPage = () => {
  const isArticlePage = location.pathname.includes("/aggiungi/articoli");

  return (
    <>
      <Container id="back-office-add-section" className="navbar-height d-flex flex-column justify-content-start align-items-start information mb-4">
        <h2 className="titles mx-auto mb-2 mt-4">{isArticlePage ? "Articoli" : "Animali"}</h2>
        <h4 className="subtitles mx-auto">{isArticlePage ? "Modifica un articolo" : "Modifica un animale"}</h4>
        <Link to={"/back-office"} className="w-100">
          <h4 className="subtitles mt-2 text-center go-back-btn">
            Torna indietro <ArrowReturnLeft />
          </h4>
        </Link>
        {isArticlePage ? <ArticleForm /> : <AnimalForm />}
      </Container>
    </>
  );
};
export default AddPage;
