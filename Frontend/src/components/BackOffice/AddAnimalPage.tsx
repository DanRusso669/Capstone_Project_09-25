import { Container } from "react-bootstrap";
import AnimalForm from "./AnimalForm";

const AddAnimalPage = () => {
  return (
    <>
      <Container id="add-animal-section" className="navbar-height d-flex flex-column justify-content-start align-items-start information mb-4">
        <h2 className="titles mx-auto mb-2 mt-4">Animali</h2>
        <h4 className="subtitles mx-auto">Aggiungi un animale</h4>
        <AnimalForm />
      </Container>
    </>
  );
};
export default AddAnimalPage;
