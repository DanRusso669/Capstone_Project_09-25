import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./profile.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  changePasswordFetch,
  setEmail,
  setName,
  setNewPassword,
  setNewPasswordRepeated,
  setOldPassword,
  setPasswordCheckResult,
  setPhoneNumber,
  setSurname,
  updateProfileFetch,
} from "../../redux/actions/profileSlice";
import MyVerticalModal from "./MyVerticalModal";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import type { ProfileResponse } from "../../interfaces/User";

type FormFields = {
  userName: string;
  userSurname: string;
  userEmail: string;
  userPassword: string;
  userPhoneNumber: string;
};

type NewPasswordFormFields = {
  newPassword: string;
  newPasswordRepeated: string;
  oldPassword: string;
};

const Profile = () => {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useAppDispatch();
  const storedUser = localStorage.getItem("user");
  const currentUser: ProfileResponse = storedUser ? JSON.parse(storedUser) : null;

  const {
    register: registerUserForm,
    handleSubmit: handleSubmitUserForm,
    setError: setErrorUserForm,
    setValue: setValueUserForm,
    formState: { errors: errorsUserForm, isSubmitting: isSubmittingUserForm },
  } = useForm<FormFields>();

  const {
    register: registerPasswordForm,
    handleSubmit: handleSubmitPasswordForm,
    setError: setErrorPasswordForm,
    reset: resetPasswordForm,
    formState: { errors: errorsPasswordForm, isSubmitting: isSubmittingPasswordForm },
  } = useForm<NewPasswordFormFields>();

  const { passwordCheckResult } = useAppSelector(state => state.profile);

  const onSubmitUserForm: SubmitHandler<FormFields> = async data => {
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
      if (typeof error === "string") setErrorUserForm("userEmail", { message: error });
    }
  };

  useEffect(() => {
    if (currentUser.userName) setValueUserForm("userName", currentUser.userName);
    if (currentUser.userSurname) setValueUserForm("userSurname", currentUser.userSurname);
    if (currentUser.userEmail) setValueUserForm("userEmail", currentUser.userEmail);
    if (currentUser.userPhoneNumber) setValueUserForm("userPhoneNumber", currentUser.userPhoneNumber);
  }, [currentUser.userEmail, currentUser.userName, currentUser.userPhoneNumber, currentUser.userSurname, setValueUserForm]);

  useEffect(() => {
    if (passwordCheckResult) setModalShow(false);
  }, [passwordCheckResult]);

  // PASSWORD CHANGE ON SUBMIT

  const onSubmitPasswordForm: SubmitHandler<NewPasswordFormFields> = async data => {
    try {
      await toast.promise(
        dispatch(changePasswordFetch(data)).unwrap(),
        {
          pending: "Aggiornamento password in corso...",
          success: "Aggiornamento password completato con successo!",
          error: "Aggiornamento password fallito!",
        },
        {
          autoClose: 5000,
        }
      );

      resetPasswordForm();
    } catch (error) {
      if (typeof error === "string") setErrorPasswordForm("oldPassword", { message: error });
    }
  };

  return (
    <>
      <Container className="profile-container navbar-height d-flex flex-column justify-content-start align-items-start information">
        <h1 className="titles mx-auto mb-2 mt-4">Il tuo profilo</h1>
        <h4 className="subtitles mx-auto mt-3 mb-2">I tuoi dati</h4>
        <Form className="mx-auto w-75" onSubmit={passwordCheckResult ? handleSubmitUserForm(onSubmitUserForm) : undefined}>
          <Row className="mb-3">
            <Form.Group as={Col} xs={12} md={6} className="mb-3" controlId="formGridName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                {...registerUserForm("userName", {
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
              {errorsUserForm.userName && <Form.Text className="text-danger">{errorsUserForm.userName.message}</Form.Text>}
            </Form.Group>

            <Form.Group as={Col} xs={12} md={6} controlId="formGridSurname">
              <Form.Label>Cognome</Form.Label>
              <Form.Control
                {...registerUserForm("userSurname", {
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
              {errorsUserForm.userSurname && <Form.Text className="text-danger">{errorsUserForm.userSurname.message}</Form.Text>}
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md={6} className="mb-3" controlId="formGridEmail">
              <Form.Label>La tua email</Form.Label>
              <Form.Control
                {...registerUserForm("userEmail", {
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
              {errorsUserForm.userEmail && <Form.Text className="text-danger">{errorsUserForm.userEmail.message}</Form.Text>}
            </Form.Group>

            <Form.Group as={Col} md={6} className="mb-3 mx-auto" controlId="formGridPhone">
              <Form.Label>Il tuo numero di telefono</Form.Label>
              <Form.Control
                {...registerUserForm("userPhoneNumber", {
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
              {errorsUserForm.userPhoneNumber && <Form.Text className="text-danger">{errorsUserForm.userPhoneNumber.message}</Form.Text>}
            </Form.Group>
          </Row>
          <div className="d-flex justify-content-center">
            <Button
              disabled={isSubmittingUserForm}
              variant="outline-none"
              type={passwordCheckResult ? "submit" : "button"}
              className="monthly-form-btn mb-4"
              onClick={passwordCheckResult ? undefined : () => setModalShow(true)}
            >
              {isSubmittingUserForm ? "Salvataggio..." : passwordCheckResult ? "Salva i nuovi dati" : "Modifica i tuoi dati"}
            </Button>
          </div>
        </Form>
        {/* PASSWORD CHANGE FORM */}
        <h4 className="subtitles mx-auto mt-3 mb-2">Cambia la tua password</h4>
        <Form className="mx-auto w-75" onSubmit={handleSubmitPasswordForm(onSubmitPasswordForm)}>
          <Row className="mb-3">
            <Form.Group as={Col} md={6} className="mb-3" controlId="formGridOldPassword">
              <Form.Label>La tua password attuale</Form.Label>
              <Form.Control
                {...registerPasswordForm("oldPassword", {
                  required: "La password è obbligatoria.",
                  pattern: {
                    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                    message: "La password deve contenere almeno 8 caratteri, una maiuscola, un numero e un carattere speciale.",
                  },
                })}
                autoComplete="off"
                className="form-inputs"
                type="password"
                placeholder="Inserisci la password attuale"
                onChange={e => dispatch(setOldPassword(e.target.value))}
              />
              {errorsPasswordForm.oldPassword && <Form.Text className="text-danger">{errorsPasswordForm.oldPassword.message}</Form.Text>}
            </Form.Group>
            <Form.Group as={Col} md={6} className="mb-3" controlId="formGridNewPassword">
              <Form.Label>La tua nuova password</Form.Label>
              <Form.Control
                {...registerPasswordForm("newPassword", {
                  required: "La password è obbligatoria.",
                  pattern: {
                    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                    message: "La password deve contenere almeno 8 caratteri, una maiuscola, un numero e un carattere speciale.",
                  },
                })}
                autoComplete="off"
                className="form-inputs"
                type="password"
                placeholder="Inserisci la nuova password"
                onChange={e => dispatch(setNewPassword(e.target.value))}
              />
              {errorsPasswordForm.newPassword && <Form.Text className="text-danger">{errorsPasswordForm.newPassword.message}</Form.Text>}
            </Form.Group>
          </Row>
          <Form.Group as={Col} md={12} className="mb-3" controlId="formGridNewPasswordRepeated">
            <Form.Label>Reinserisci la tua nuova password</Form.Label>
            <Form.Control
              {...registerPasswordForm("newPasswordRepeated", {
                required: "La password è obbligatoria.",
                pattern: {
                  value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                  message: "La password deve contenere almeno 8 caratteri, una maiuscola, un numero e un carattere speciale.",
                },
              })}
              autoComplete="off"
              className="form-inputs"
              type="password"
              placeholder="Inserisci nuovamente la nuova password"
              onChange={e => dispatch(setNewPasswordRepeated(e.target.value))}
            />
            {errorsPasswordForm.newPasswordRepeated && <Form.Text className="text-danger">{errorsPasswordForm.newPasswordRepeated.message}</Form.Text>}
          </Form.Group>

          <div className="d-flex justify-content-center">
            <Button disabled={isSubmittingPasswordForm} variant="outline-none" type={"submit"} className="monthly-form-btn mb-4">
              {isSubmittingPasswordForm ? "Salvataggio..." : "Modifica la tua password"}
            </Button>
          </div>
        </Form>
      </Container>
      <MyVerticalModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default Profile;
