import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./profile.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  profileFetch,
  setEmail,
  setName,
  setPassword,
  setPasswordCheckResult,
  setPhoneNumber,
  setSurname,
  updateProfileFetch,
} from "../../redux/actions/profileSlice";
import MyVerticalModal from "./MyVerticalModal";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

type FormFields = {
  name: string;
  surname: string;
  email: string;
  password: string;
  phoneNumber: string;
};

const Profile = () => {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const {
    data: { name, surname, email, phoneNumber, password },
    passwordCheckResult,
  } = useAppSelector(state => state.profile);

  const onSubmit: SubmitHandler<FormFields> = async data => {
    try {
      await toast.promise(
        dispatch(updateProfileFetch(data)).unwrap(),
        {
          pending: "Aggiornamento dati in corso...",
          success: "Aggiornamento dati completato con successo!",
          error: "Aggiornamento dati fallito!",
        },
        {
          autoClose: 5000,
        }
      );

      dispatch(setPasswordCheckResult(false));
    } catch (error) {
      if (typeof error === "string") setError("email", { message: error });
    }
  };

  useEffect(() => {
    dispatch(profileFetch());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (name) setValue("name", name);
    if (surname) setValue("surname", surname);
    if (email) setValue("email", email);
    if (phoneNumber) setValue("phoneNumber", phoneNumber);
    if (password) setValue("password", password);
  }, [name, surname, email, phoneNumber, password, setValue]);

  useEffect(() => {
    if (passwordCheckResult) setModalShow(false);
  }, [passwordCheckResult]);

  return (
    <>
      <Container className="profile-container navbar-height d-flex flex-column justify-content-start align-items-start information">
        <h1 className="titles mx-auto mb-2 mt-4">Il tuo profilo</h1>
        <h4 className="subtitles mx-auto mt-3 mb-2">I tuoi dati</h4>
        <Form className="mx-auto w-75" onSubmit={passwordCheckResult ? handleSubmit(onSubmit) : undefined}>
          <Row className="mb-3">
            <Form.Group as={Col} xs={12} md={6} className="mb-3" controlId="formGridName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                {...register("name", {
                  required: "Il nome è obbligatorio.",
                  minLength: {
                    message: "Il nome deve avere almeno 3 caratteri.",
                    value: 3,
                  },
                })}
                autoComplete="off"
                className="form-inputs"
                type="text"
                placeholder="Inserisci il nome"
                readOnly={!passwordCheckResult}
                {...(passwordCheckResult && {
                  onChange: e => {
                    dispatch(setName(e.target.value));
                  },
                })}
              />
              {errors.name && <Form.Text className="text-danger">{errors.name.message}</Form.Text>}
            </Form.Group>

            <Form.Group as={Col} xs={12} md={6} controlId="formGridSurname">
              <Form.Label>Cognome</Form.Label>
              <Form.Control
                {...register("surname", {
                  required: "Il cognome è obbligatorio.",
                  minLength: {
                    message: "Il cognome deve avere almeno 3 caratteri.",
                    value: 3,
                  },
                })}
                autoComplete="off"
                className="form-inputs"
                type="text"
                placeholder="Inserisci il cognome"
                readOnly={!passwordCheckResult}
                {...(passwordCheckResult && {
                  onChange: e => {
                    dispatch(setSurname(e.target.value));
                  },
                })}
              />
              {errors.surname && <Form.Text className="text-danger">{errors.surname.message}</Form.Text>}
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md={6} className="mb-3" controlId="formGridEmail">
              <Form.Label>La tua email</Form.Label>
              <Form.Control
                {...register("email", {
                  required: "L'email è obbligatoria.",
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: "Formato email non valido.",
                  },
                })}
                autoComplete="off"
                className="form-inputs"
                type="email"
                placeholder="Inserisci email"
                readOnly={!passwordCheckResult}
                {...(passwordCheckResult && {
                  onChange: e => {
                    dispatch(setEmail(e.target.value));
                  },
                })}
              />
              {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
            </Form.Group>

            <Form.Group as={Col} md={6} className="mb-3 mx-auto" controlId="formGridPhone">
              <Form.Label>Il tuo numero di telefono</Form.Label>
              <Form.Control
                {...register("phoneNumber", {
                  required: "Il numero di telefono è obbligatorio.",
                  validate: value => {
                    if (value.length !== 10) {
                      return "Numero di telefono non valido.";
                    }
                    return true;
                  },
                })}
                autoComplete="off"
                className="form-inputs"
                placeholder="348123456"
                type="number"
                readOnly={!passwordCheckResult}
                {...(passwordCheckResult && {
                  onChange: e => {
                    dispatch(setPhoneNumber(e.target.value));
                  },
                })}
              />
              {errors.phoneNumber && <Form.Text className="text-danger">{errors.phoneNumber.message}</Form.Text>}
            </Form.Group>

            {passwordCheckResult && (
              <>
                <Form.Group as={Col} md={6} className="mb-3" controlId="formGridPassword">
                  <Form.Label>La tua password</Form.Label>
                  <Form.Control
                    {...register("password", {
                      required: "La password è obbligatoria.",
                      pattern: {
                        value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                        message: "La password deve contenere almeno 8 caratteri, una maiuscola, un numero e un carattere speciale.",
                      },
                    })}
                    autoComplete="off"
                    className="form-inputs"
                    type="password"
                    placeholder="Scegli una password"
                    onChange={e => {
                      dispatch(setPassword(e.target.value));
                    }}
                  />
                  {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
                </Form.Group>
              </>
            )}
          </Row>
          <div className="d-flex justify-content-center">
            <Button
              disabled={isSubmitting}
              variant="outline-none"
              type={passwordCheckResult ? "submit" : "button"}
              className="monthly-form-btn mb-4"
              onClick={passwordCheckResult ? undefined : () => setModalShow(true)}
            >
              {isSubmitting ? "Salvataggio..." : passwordCheckResult ? "Salva i nuovi dati" : "Modifica i tuoi dati"}
            </Button>
          </div>
        </Form>
        <h4 className="subtitles mx-auto mt-3 mb-2">Le tue donazioni mensili</h4>
        <h4 className="subtitles mx-auto mt-3 mb-2">Le tue adozioni</h4>
      </Container>
      <MyVerticalModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default Profile;
