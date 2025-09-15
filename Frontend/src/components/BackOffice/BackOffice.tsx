import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./backOffice.css";
import { useState } from "react";
import { Plus, Dash, TrashFill } from "react-bootstrap-icons";
import { useAppDispatch } from "../../redux/store";
import { animalCRUDFetch } from "../../redux/actions/animalSlice";

const BackOffice = () => {
  const [category, setCategory] = useState("animals");
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(animalCRUDFetch({ animalId: deleteId, method: "DELETE" }));
    setDeleteId("");
  };

  return (
    <>
      <Container id="back-office-section" className="navbar-height d-flex flex-column justify-content-start align-items-start information">
        <h1 className="titles mx-auto mb-2 mt-4">Back Office</h1>
        {category === "" && (
          <>
            <h4 className="subtitles mx-auto mt-3 mb-2">Scegli una categoria</h4>
            <Row className="d-flex justify-content-center align-items-center w-75 mt-5 mx-auto g-2">
              <Col md={6} lg={4} className="text-center text-md-end">
                <Button variant="outline-none" className="category-btn" onClick={() => setCategory("animals")}>
                  Animali
                </Button>
              </Col>
              <Col md={6} lg={4} className="text-center text-md-start text-lg-center">
                <Button variant="outline-none" className="category-btn" onClick={() => setCategory("news")}>
                  Articoli
                </Button>
              </Col>
              <Col md={6} lg={4} className="text-center  text-lg-start">
                <Button variant="outline-none" className="category-btn" onClick={() => setCategory("blog")}>
                  Blog
                </Button>
              </Col>
            </Row>
          </>
        )}
        {category === "animals" && (
          <>
            <h4 className="subtitles mt-3 mb-2">
              Visualizza tutti gli animale <Plus />
            </h4>
            <p>Cliccare il + per visualizzare la tabella con tutti gli animali registrati.</p>
            <h4 className="subtitles mt-3 mb-2">
              Aggiungi un animale <Plus />
            </h4>
            <p>Cliccare il + per aggiungere un animale.</p>
            <h4 className="subtitles mt-3 mb-2">
              Modifica un animale <Plus />
            </h4>
            <p>Cliccare il + per modificare un animale tramite ID.</p>
            <h4 className="subtitles mt-3 mb-2">
              Elimina un animale{" "}
              {showDeleteForm ? <Dash onClick={() => setShowDeleteForm(!showDeleteForm)} /> : <Plus onClick={() => setShowDeleteForm(!showDeleteForm)} />}
            </h4>
            <p>Cliccare il + per eliminare un animale.</p>
            {showDeleteForm && (
              <div className="delete-wrapper d-flex flex-column justify-content-start align-items-start w-50">
                <p className="mb-1 mt-2 align-middle">Inserire l'ID dell'animale che si vuole cancellare:</p>
                <Form.Group controlId="deleteById" className="d-flex justify-content-center align-items-center">
                  <Form.Control
                    value={deleteId}
                    className="form-inputs rounded-start rounded-end-0"
                    type="number"
                    onChange={e => setDeleteId(e.target.value)}
                  />
                  <Button variant="outline-none" className="delete-btn rounded-end rounded-start-0 border-start-0" onClick={() => handleDelete()}>
                    <TrashFill />
                  </Button>
                </Form.Group>
              </div>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default BackOffice;
