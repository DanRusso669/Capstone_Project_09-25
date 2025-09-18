import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import "./backOffice.css";
import { useState } from "react";
import { Plus, Dash, TrashFill, ArrowReturnLeft, SendFill } from "react-bootstrap-icons";
import { useAppDispatch } from "../../redux/store";
import { animalCRUDFetch } from "../../redux/actions/animalSlice";
import { toast } from "react-toastify";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { adoptionCRUDFetch } from "../../redux/actions/adoptionSlice";

type BackOfficeFields = {
  animalIdToDelete?: string;
  animalIdToUpdate?: string;
  adoptionIdToDelete?: string;
  adoptionIdToUpdate?: string;
};

type BackendError = {
  message: string;
  timestamp: string;
};

const BackOffice = () => {
  const [category, setCategory] = useState("");
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [animalIdToDelete, setAnimalIdToDelete] = useState("");
  const [adoptionIdToDelete, setAdoptionIdToDelete] = useState("");
  const [adoptionIdToUpdate, setAdoptionIdToUpdate] = useState("");
  const [animalIdToUpdate, setAnimalIdToUpdate] = useState("");
  const [showModal, setShowModal] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<BackOfficeFields>();

  const handleAnimalDelete = async () => {
    setShowModal(false);
    try {
      await toast.promise(
        dispatch(animalCRUDFetch({ animalId: animalIdToDelete, method: "DELETE", animalData: null })).unwrap(),
        {
          pending: `Rimozione in corso...`,
          success: `Animale con ID ${animalIdToDelete} rimosso con successo.`,
          error: `Rimozione fallita. Riprovare.`,
        },
        {
          autoClose: 4000,
        }
      );
      setAnimalIdToDelete("");
    } catch (error) {
      const backendError = error as BackendError;
      setError("animalIdToDelete", { message: backendError.message });
    }
  };

  const handleAdoptionDelete = async () => {
    setShowModal(false);
    try {
      await toast.promise(
        dispatch(adoptionCRUDFetch({ adoptionId: adoptionIdToDelete, method: "DELETE", adoptionData: null })).unwrap(),
        {
          pending: `Rimozione in corso...`,
          success: `Adozione con ID ${adoptionIdToDelete} rimossa con successo.`,
          error: `Rimozione fallita. Riprovare.`,
        },
        {
          autoClose: 4000,
        }
      );
      setAdoptionIdToDelete("");
    } catch (error) {
      const backendError = error as BackendError;
      setError("adoptionIdToDelete", { message: backendError.message });
    }
  };

  const onSubmit: SubmitHandler<BackOfficeFields> = () => {
    setShowModal(true);
  };

  const handleAnimalUpdate = async () => {
    try {
      const response = await dispatch(animalCRUDFetch({ animalId: animalIdToUpdate, method: "GET", animalData: null })).unwrap();
      if (response) {
        navigate(`/back-office/modifica/animali/${animalIdToUpdate}`);
      }
    } catch (error) {
      const backendError = error as BackendError;
      setError("animalIdToUpdate", { message: backendError.message });
    }
  };

  const handleAdoptionUpdate = async () => {
    try {
      const response = await dispatch(adoptionCRUDFetch({ adoptionId: adoptionIdToUpdate, method: "GET", adoptionData: null })).unwrap();
      if (response) {
        navigate(`/back-office/modifica/adozioni/${adoptionIdToUpdate}`);
      }
    } catch (error) {
      const backendError = error as BackendError;
      setError("adoptionIdToUpdate", { message: backendError.message });
    }
  };

  return (
    <>
      <Container id="back-office-main-section" className="navbar-height d-flex flex-column justify-content-start align-items-start information mb-4">
        <h1 className="titles mx-auto mb-2 mt-4">Back Office</h1>
        {category === "" && (
          <>
            <h4 className="subtitles mx-auto mt-3 mb-2">Scegli una categoria</h4>
            <Row className="d-flex justify-content-center align-items-center w-75 mt-5 mx-auto g-2">
              <Col md={6} lg={3} className="text-center">
                <Button variant="outline-none" className="category-btn" onClick={() => setCategory("animals")}>
                  Animali
                </Button>
              </Col>
              <Col md={6} lg={3} className="text-center">
                <Button variant="outline-none" className="category-btn" onClick={() => setCategory("adoptions")}>
                  Adozioni
                </Button>
              </Col>
              <Col md={6} lg={3} className="text-center">
                <Button variant="outline-none" className="category-btn" onClick={() => setCategory("news")}>
                  Articoli
                </Button>
              </Col>
              <Col md={6} lg={3} className="text-center">
                <Button variant="outline-none" className="category-btn" onClick={() => setCategory("blog")}>
                  Blog
                </Button>
              </Col>
            </Row>
          </>
        )}
        {/* ANIMALS CATEGORY */}
        {category === "animals" && (
          <>
            <h2 className="titles mx-auto mb-2 mt-4">Animali</h2>
            <h4 className="subtitles mt-3 " onClick={() => setCategory("")} style={{ cursor: "pointer" }}>
              Torna indietro <ArrowReturnLeft />
            </h4>
            <h4 className="subtitles mt-3 mb-2">
              Visualizza tutti gli animale{" "}
              <Link to={"/back-office/visualizza/animali"} className="crud-links">
                <Plus />
              </Link>
            </h4>
            <p>Cliccare il + per visualizzare la tabella con tutti gli animali registrati.</p>
            <h4 className="subtitles mt-3 mb-2">
              Aggiungi un animale{" "}
              <Link to={"/back-office/aggiungi/animali"} className="crud-links">
                <Plus />
              </Link>
            </h4>
            <p>Cliccare il + per aggiungere un animale.</p>
            <h4 className="subtitles mt-3 mb-2">
              Modifica un animale{" "}
              {showUpdateForm ? (
                <Dash onClick={() => setShowUpdateForm(!showUpdateForm)} style={{ cursor: "pointer" }} />
              ) : (
                <Plus onClick={() => setShowUpdateForm(!showUpdateForm)} style={{ cursor: "pointer" }} />
              )}
            </h4>
            <p>Cliccare il + per modificare un animale tramite ID.</p>
            {showUpdateForm && (
              <div className="update-wrapper d-flex flex-column justify-content-start align-items-start w-50">
                <p className="mb-1 mt-2 align-middle">Inserire l'ID dell'animale che si vuole modificare:</p>
                <Form onSubmit={handleSubmit(handleAnimalUpdate)}>
                  <Form.Group controlId="updateById" className="d-flex justify-content-center align-items-center">
                    <Form.Control
                      {...register("animalIdToUpdate", { required: "Il campo non può essere vuoto." })}
                      value={animalIdToUpdate}
                      className="form-inputs rounded-start rounded-end-0"
                      type="number"
                      onChange={e => setAnimalIdToUpdate(e.target.value)}
                    />
                    <Button variant="outline-none" className="update-btn rounded-end rounded-start-0 border-start-0" type="submit">
                      <SendFill />
                    </Button>
                  </Form.Group>
                </Form>
                {errors.animalIdToUpdate && <p className="text-danger mt-2">{errors.animalIdToUpdate.message}</p>}
              </div>
            )}

            <h4 className="subtitles mt-3 mb-2">
              Elimina un animale{" "}
              {showDeleteForm ? (
                <Dash onClick={() => setShowDeleteForm(!showDeleteForm)} style={{ cursor: "pointer" }} />
              ) : (
                <Plus onClick={() => setShowDeleteForm(!showDeleteForm)} style={{ cursor: "pointer" }} />
              )}
            </h4>
            <p>Cliccare il + per eliminare un animale.</p>

            {showDeleteForm && (
              <div className="delete-wrapper d-flex flex-column justify-content-start align-items-start w-50">
                <p className="mb-1 mt-2 align-middle">Inserire l'ID dell'animale che si vuole cancellare:</p>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group controlId="deleteById" className="d-flex justify-content-center align-items-center">
                    <Form.Control
                      {...register("animalIdToDelete", { required: "Il campo non può essere vuoto." })}
                      value={animalIdToDelete}
                      className="form-inputs rounded-start rounded-end-0"
                      type="number"
                      onChange={e => setAnimalIdToDelete(e.target.value)}
                    />
                    <Button variant="outline-none" className="delete-btn rounded-end rounded-start-0 border-start-0" type="submit">
                      <TrashFill />
                    </Button>
                  </Form.Group>
                </Form>
                {errors.animalIdToDelete && <p className="text-danger mt-2">{errors.animalIdToDelete.message}</p>}
              </div>
            )}

            <Modal centered show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton></Modal.Header>

              <Modal.Body>
                <p className="text-center">
                  Sei sicuro di volere rimuovere questo animale ?<br /> <span className="fw-bold">L'azione è irreversibile.</span>
                </p>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="outline-none" id="cancel-delete-animal-btn" onClick={() => setShowModal(false)}>
                  Annulla
                </Button>
                <Button variant="outline-none" id="confirm-delete-animal-btn" onClick={handleAnimalDelete}>
                  Rimuovi
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )}
        {/* ADOPTIONS CATEGORY */}
        {category === "adoptions" && (
          <>
            <h2 className="titles mx-auto mb-2 mt-4">Adozioni</h2>
            <h4 className="subtitles mt-3 " onClick={() => setCategory("")} style={{ cursor: "pointer" }}>
              Torna indietro <ArrowReturnLeft />
            </h4>
            <h4 className="subtitles mt-3 mb-2">
              Visualizza tutte le adozioni{" "}
              <Link to={"/back-office/visualizza/adozioni"} className="crud-links">
                <Plus />
              </Link>
            </h4>
            <p>Cliccare il + per visualizzare la tabella con tutte le adozioni registrate.</p>
            <h4 className="subtitles mt-3 mb-2">
              Aggiungi un'adozione{" "}
              <Link to={"/back-office/aggiungi/adozioni"} className="crud-links">
                <Plus />
              </Link>
            </h4>
            <p>Cliccare il + per aggiungere un'adozione.</p>
            <h4 className="subtitles mt-3 mb-2">
              Modifica un'adozione{" "}
              {showUpdateForm ? (
                <Dash onClick={() => setShowUpdateForm(!showUpdateForm)} style={{ cursor: "pointer" }} />
              ) : (
                <Plus onClick={() => setShowUpdateForm(!showUpdateForm)} style={{ cursor: "pointer" }} />
              )}
            </h4>
            <p>Cliccare il + per modificare un'adozione tramite ID.</p>
            {showUpdateForm && (
              <div className="update-wrapper d-flex flex-column justify-content-start align-items-start w-50">
                <p className="mb-1 mt-2 align-middle">Inserire l'ID dell'adozione che si vuole modificare:</p>
                <Form onSubmit={handleSubmit(handleAdoptionUpdate)}>
                  <Form.Group controlId="updateById" className="d-flex justify-content-center align-items-center">
                    <Form.Control
                      {...register("adoptionIdToUpdate", { required: "Il campo non può essere vuoto." })}
                      value={adoptionIdToUpdate}
                      className="form-inputs rounded-start rounded-end-0"
                      type="number"
                      onChange={e => setAdoptionIdToUpdate(e.target.value)}
                    />
                    <Button variant="outline-none" className="update-btn rounded-end rounded-start-0 border-start-0" type="submit">
                      <SendFill />
                    </Button>
                  </Form.Group>
                </Form>
                {errors.adoptionIdToUpdate && <p className="text-danger mt-2">{errors.adoptionIdToUpdate.message}</p>}
              </div>
            )}

            <h4 className="subtitles mt-3 mb-2">
              Elimina un'adozione{" "}
              {showDeleteForm ? (
                <Dash onClick={() => setShowDeleteForm(!showDeleteForm)} style={{ cursor: "pointer" }} />
              ) : (
                <Plus onClick={() => setShowDeleteForm(!showDeleteForm)} style={{ cursor: "pointer" }} />
              )}
            </h4>
            <p>Cliccare il + per eliminare un'adozione.</p>

            {showDeleteForm && (
              <div className="delete-wrapper d-flex flex-column justify-content-start align-items-start w-50">
                <p className="mb-1 mt-2 align-middle">Inserire l'ID dell'adozione che si vuole cancellare:</p>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group controlId="deleteById" className="d-flex justify-content-center align-items-center">
                    <Form.Control
                      {...register("adoptionIdToDelete", { required: "Il campo non può essere vuoto." })}
                      value={adoptionIdToDelete}
                      className="form-inputs rounded-start rounded-end-0"
                      type="number"
                      onChange={e => setAdoptionIdToDelete(e.target.value)}
                    />
                    <Button variant="outline-none" className="delete-btn rounded-end rounded-start-0 border-start-0" type="submit">
                      <TrashFill />
                    </Button>
                  </Form.Group>
                </Form>
                {errors.adoptionIdToDelete && <p className="text-danger mt-2">{errors.adoptionIdToDelete.message}</p>}
              </div>
            )}

            <Modal centered show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton></Modal.Header>

              <Modal.Body>
                <p className="text-center">
                  Sei sicuro di volere rimuovere questa adozione ?<br /> <span className="fw-bold">L'azione è irreversibile.</span>
                </p>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="outline-none" id="cancel-delete-animal-btn" onClick={() => setShowModal(false)}>
                  Annulla
                </Button>
                <Button variant="outline-none" id="confirm-delete-animal-btn" onClick={handleAdoptionDelete}>
                  Rimuovi
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )}
      </Container>
    </>
  );
};

export default BackOffice;
