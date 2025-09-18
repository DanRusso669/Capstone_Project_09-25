import { Container } from "react-bootstrap";
import AnimalForm from "./AnimalForm";

const UpdateAnimalPage = () => {
  const isAdoptionPage = location.pathname.includes("/modifica/adozioni");

  return (
    <>
      <Container id="back-office-update-section" className="navbar-height d-flex flex-column justify-content-start align-items-start information mb-4">
        <h2 className="titles mx-auto mb-2 mt-4">{isAdoptionPage ? "Adozioni" : "Animali"}</h2>
        <h4 className="subtitles mx-auto">{isAdoptionPage ? "Modifica un'adozione" : "Modifica un animale"}</h4>
        {isAdoptionPage ? <></> : <AnimalForm />}
      </Container>
    </>
  );
};

export default UpdateAnimalPage;
