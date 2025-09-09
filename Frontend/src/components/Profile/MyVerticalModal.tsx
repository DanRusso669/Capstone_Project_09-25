import { Button, Col, Form, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useState } from "react";
import { passwordCheck } from "../../redux/actions/profileSlice";

interface Props {
  show: boolean;
  onHide: () => void;
}

const MyVerticalModal = ({ show, onHide }: Props) => {
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState("");
  const dispatch = useAppDispatch();
  const { passwordCheckResult } = useAppSelector(state => state.profile);

  const handleCheck = () => {
    if (password.length === 0) {
      setValidation("Il campo non può essere vuoto.");
      return;
    }

    dispatch(passwordCheck({ password }));

    if (!passwordCheckResult) {
      setValidation("La password non è corretta.");
    }
  };

  return (
    <>
      <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="d-flex flex-column align-items-center">
          <h4 className="subtitles">Modifica dei dati</h4>
          <p className="mt-2 mb-3">Per poter modificare i tuoi dati, devi inserire la tua password.</p>
          <Form.Group as={Col} md={6} className="mb-3 mx-auto" controlId="formGridPassword">
            <Form.Control
              autoComplete="off"
              className="form-inputs"
              type="password"
              placeholder="Inserisci la tua password"
              autoFocus
              onChange={e => setPassword(e.target.value)}
            />
            {<div className="text-danger text-center mt-2 fw-bold">{validation}</div>}
          </Form.Group>
          <Button className="monthly-form-btn" variant="outline-none" onClick={handleCheck}>
            Conferma
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MyVerticalModal;
