import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import "./backOffice.css";
import { useEffect, useState } from "react";
import { Plus, Dash, TrashFill, ArrowReturnLeft, SendFill } from "react-bootstrap-icons";
import { useAppDispatch, useAppSelector } from "../../redux/store";
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
  adoptionStatus: string;
  adoptionStartDate?: Date;
};

type BackendError = {
  message: string;
  timestamp: string;
};

const BackOffice = () => {
  const [category, setCategory] = useState("");
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showUpdateSelectForm, setShowUpdateSelectForm] = useState(false);
  const [animalIdToDelete, setAnimalIdToDelete] = useState("");
  const [adoptionIdToDelete, setAdoptionIdToDelete] = useState("");
  const [adoptionIdToUpdate, setAdoptionIdToUpdate] = useState("");
  const [animalIdToUpdate, setAnimalIdToUpdate] = useState("");
  const [adoptionStatus, setAdoptionStatus] = useState("");
  const [showModal, setShowModal] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    setError,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BackOfficeFields>();

  const { single } = useAppSelector(state => state.adoptions.data);

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
    console.log(adoptionIdToUpdate);
    try {
      const response = await dispatch(adoptionCRUDFetch({ adoptionId: adoptionIdToUpdate, method: "GET", adoptionData: null })).unwrap();
      if (response) {
        setShowUpdateForm(false);
        setShowUpdateSelectForm(true);
      }
    } catch (error) {
      const backendError = error as BackendError;
      setError("adoptionIdToUpdate", { message: backendError.message });
    }
  };

  const handleDefinitiveAdoptionUpdate: SubmitHandler<BackOfficeFields> = async data => {
    try {
      const response = await toast.promise(
        dispatch(
          adoptionCRUDFetch({
            adoptionId: data.adoptionIdToUpdate,
            method: "PUT",
            adoptionData: { status: data.adoptionStatus, startDate: data.adoptionStartDate },
          })
        ).unwrap(),
        {
          pending: "Aggiornamento in corso...",
          success: "Adozione aggiornata con successo!",
          error: "Si è verificato un errore durante l'aggiornamento.",
        },
        {
          autoClose: 4000, // Durata del toast
        }
      );

      if (response) {
        setAdoptionIdToUpdate("");
        setShowUpdateSelectForm(false);
        setValue("adoptionIdToUpdate", "");
        setValue("adoptionStatus", "");
        setValue("adoptionStartDate", undefined);
      }
    } catch (error) {
      const backendError = error as BackendError;
      setError("adoptionIdToUpdate", { message: backendError.message });
    }
  };

  useEffect(() => {
    setShowDeleteForm(false);
    setShowUpdateForm(false);
    setShowUpdateSelectForm(false);
    setAnimalIdToDelete("");
    setAdoptionIdToDelete("");
    setAdoptionIdToUpdate("");
    setAnimalIdToUpdate("");
    setAdoptionStatus("");
    setShowModal(false);
  }, [category]);

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
            <h4 className="subtitles mt-3 plus-minus-icons" onClick={() => setCategory("")}>
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
                <Dash onClick={() => setShowUpdateForm(!showUpdateForm)} className="plus-minus-icons" />
              ) : (
                <Plus onClick={() => setShowUpdateForm(!showUpdateForm)} className="plus-minus-icons" />
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
                <Dash onClick={() => setShowDeleteForm(!showDeleteForm)} className="plus-minus-icons" />
              ) : (
                <Plus onClick={() => setShowDeleteForm(!showDeleteForm)} className="plus-minus-icons" />
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
            <h4 className="subtitles mt-3 plus-minus-icons" onClick={() => setCategory("")}>
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
              Modifica un'adozione{" "}
              {showUpdateForm ? (
                <Dash onClick={() => setShowUpdateForm(!showUpdateForm)} className="plus-minus-icons" />
              ) : (
                <Plus onClick={() => setShowUpdateForm(!showUpdateForm)} className="plus-minus-icons" />
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

            {showUpdateSelectForm && !showUpdateForm && (
              <div className="update-wrapper d-flex flex-column justify-content-start align-items-start w-50">
                <p className="mb-1 mt-2 align-middle">{`Hai selezionato l'adozione con ID ${adoptionIdToUpdate}`}</p>
                <p className="mb-1 align-middle">{`Al momento lo status di questa adozione è ${single?.status}`}</p>
                <p className="mb-1 align-middle">Seleziona lo status:</p>
                <Form onSubmit={handleSubmit(handleDefinitiveAdoptionUpdate)}>
                  <Form.Group as={Col} controlId="formGridAdoptionStatus">
                    <Form.Select
                      value={adoptionStatus}
                      {...register("adoptionStatus", { required: "Seleziona uno status" })}
                      className="border border-dark"
                      onChange={e => setAdoptionStatus(e.target.value)}
                    >
                      <option value={"DENIED"}>Rifiutato</option>
                      <option value={"ACCEPTED"}>Accettato</option>
                      <option value={"ENDED"}>Concluso</option>
                    </Form.Select>
                  </Form.Group>
                  {adoptionStatus === "ACCEPTED" && (
                    <div>
                      <p className="mb-1 mt-2 align-middle">Seleziona la data di inizio:</p>
                      <Form.Group as={Col}>
                        <Form.Control type="date" {...register("adoptionStartDate", { required: "Seleziona una data di inizio" })} />
                        {errors.adoptionStartDate && <p className="text-danger mt-2">{errors.adoptionStartDate.message}</p>}
                      </Form.Group>
                    </div>
                  )}
                  <div className="d-flex justify-content-center mt-4">
                    <Button variant="outline-none" className="add-update-animal-btn" type="submit">
                      Conferma modifica
                    </Button>
                  </div>
                </Form>
              </div>
            )}

            <h4 className="subtitles mt-3 mb-2">
              Elimina un'adozione{" "}
              {showDeleteForm ? (
                <Dash onClick={() => setShowDeleteForm(!showDeleteForm)} className="plus-minus-icons" />
              ) : (
                <Plus onClick={() => setShowDeleteForm(!showDeleteForm)} className="plus-minus-icons" />
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
