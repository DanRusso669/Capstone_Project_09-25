import { Button, Col, Form, Row } from "react-bootstrap";
import "./registerPage.css";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { registerFetch, resetForm, setEmail, setName, setPassword, setPhoneNumber, setSurname } from "../../redux/actions/registerSlice";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type FormFields = {
  userName: string;
  userSurname: string;
  userEmail: string;
  userPassword: string;
  userPhoneNumber: string;
  privacy: boolean;
};

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    data: { userName, userSurname, userEmail, userPassword, userPhoneNumber },
    status,
  } = useAppSelector(state => state.register);

  const onSubmit: SubmitHandler<FormFields> = async data => {
    try {
      await toast.promise(
        dispatch(registerFetch(data)).unwrap(),
        {
          pending: "Registrazione in corso...",
          success: "Registrazione completata con successo!",
          error: "Registrazione fallita!",
        },
        {
          autoClose: 5000,
        }
      );
    } catch (error) {
      if (typeof error === "string") setError("userEmail", { message: error });
    }
  };

  useEffect(() => {
    if (status === "succeeded") {
      dispatch(resetForm());
      navigate("/accedi");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, dispatch]);

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mb-3">
          <Form.Group as={Col} xs={12} sm={6} controlId="formGridName">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              {...register("userName", {
                required: "Il nome è obbligatorio.",
                minLength: {
                  message: "Il nome deve avere almeno 3 caratteri.",
                  value: 3,
                },
              })}
              value={userName}
              autoComplete="off"
              className="form-inputs"
              type="text"
              placeholder="Inserisci il nome"
              onChange={e => dispatch(setName(e.target.value))}
            />
            {errors.userName && <Form.Text className="text-danger">{errors.userName.message}</Form.Text>}
          </Form.Group>

          <Form.Group as={Col} xs={12} sm={6} controlId="formGridSurname" className="mt-3 mt-sm-0">
            <Form.Label>Cognome</Form.Label>
            <Form.Control
              {...register("userSurname", {
                required: "Il cognome è obbligatorio.",
                minLength: {
                  message: "Il cognome deve avere almeno 3 caratteri.",
                  value: 3,
                },
              })}
              value={userSurname}
              autoComplete="off"
              className="form-inputs"
              type="text"
              placeholder="Inserisci il cognome"
              onChange={e => dispatch(setSurname(e.target.value))}
            />
            {errors.userSurname && <Form.Text className="text-danger">{errors.userSurname.message}</Form.Text>}
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            {...register("userEmail", {
              required: "L'email è obbligatoria.",
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "Formato email non valido.",
              },
            })}
            value={userEmail}
            autoComplete="off"
            className="form-inputs"
            type="text"
            placeholder="Inserisci email"
            onChange={e => dispatch(setEmail(e.target.value))}
          />
          {errors.userEmail && <Form.Text className="text-danger">{errors.userEmail.message}</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridPassword">
          <Form.Label>Scegli una password</Form.Label>
          <Form.Control
            {...register("userPassword", {
              required: "La password è obbligatoria.",
              pattern: {
                value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                message: "La password deve contenere almeno 8 caratteri, una maiuscola, un numero e un carattere speciale.",
              },
            })}
            value={userPassword}
            autoComplete="off"
            className="form-inputs"
            type="password"
            placeholder="Scegli una password"
            onChange={e => dispatch(setPassword(e.target.value))}
          />
          {errors.userPassword && <Form.Text className="text-danger">{errors.userPassword.message}</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridPhone">
          <Form.Label>Numero di Telefono</Form.Label>
          <Form.Control
            {...register("userPhoneNumber", {
              required: "Il numero di telefono è obbligatorio.",
              validate: value => {
                if (value.length !== 10) {
                  return "Numero di telefono non valido.";
                }
                return true;
              },
            })}
            value={userPhoneNumber}
            autoComplete="off"
            className="form-inputs"
            placeholder="348123456"
            type="number"
            onChange={e => dispatch(setPhoneNumber(e.target.value))}
          />
          {errors.userPhoneNumber && <Form.Text className="text-danger">{errors.userPhoneNumber.message}</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check
            {...register("privacy", {
              required: "Devi accettare i termini per continuare.",
            })}
            type="checkbox"
            label=" * Autorizzo il trattamento dei miei dati personali, ai sensi delle vigenti normative privacy (Regolamento Europeo n.679/16), secondo le finalità e le modalità indicate nella Vostra informativa."
          />
          {errors.privacy && <Form.Text className="text-danger">{errors.privacy.message}</Form.Text>}
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button disabled={isSubmitting} type="submit" variant="outline-none" className="monthly-form-btn">
            {isSubmitting ? "Caricamento..." : "Registrati"}
          </Button>
        </div>
      </Form>
    </>
  );
};

export default RegisterForm;
