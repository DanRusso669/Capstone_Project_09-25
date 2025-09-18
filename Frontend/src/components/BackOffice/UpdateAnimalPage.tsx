import { Container } from "react-bootstrap";
import AnimalForm from "./AnimalForm";

const UpdateAnimalPage = () => {
  return (
    <>
        <h2 className="titles mx-auto mb-2 mt-4">Animali</h2>
        <h4 className="subtitles mx-auto">Modifica un animale</h4>
        <AnimalForm />
      <Container id="back-office-update-section" className="navbar-height d-flex flex-column justify-content-start align-items-start information mb-4">
      </Container>
    </>
  );
};

export default UpdateAnimalPage;
