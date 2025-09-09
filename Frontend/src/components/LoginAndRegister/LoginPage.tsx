import { Button, Container, Form } from "react-bootstrap";
import "./loginPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { loginFetch, resetForm, setEmail, setPassword } from "../../redux/actions/loginSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";

type FormFields = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    data: { email, password },
    status,
  } = useAppSelector(state => state.login);

  const onSubmit: SubmitHandler<FormFields> = async data => {
    try {
      await toast.promise(
        dispatch(loginFetch(data)).unwrap(),
        {
          pending: "Accesso in corso...",
          success: "Accesso completato con successo!",
          error: "Accesso fallito!",
        },
        {
          autoClose: 5000,
        }
      );
    } catch (error) {
      if (typeof error === "string") toast.error(error);
    }
  };

  useEffect(() => {
    if (status === "succeeded") {
      dispatch(resetForm());
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, dispatch]);

  return (
    <>
      <Container className="login-section navbar-height d-flex flex-column justify-content-start align-items-center information">
        <h1 className="titles mb-4 mt-4">Accedi al tuo account</h1>
        <div className="login-form-wrapper d-flex justify-content-center align-items-center">
          <Form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="ms-1">Indirizzo Email</Form.Label>
              <Form.Control
                {...register("email", {
                  required: "L'email è obbligatoria.",
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: "Formato email non valido.",
                  },
                })}
                value={email}
                type="email"
                placeholder="Inserisci la tua email"
                onChange={e => dispatch(setEmail(e.target.value))}
              />
              {errors.email ? (
                <Form.Text className="text-danger">{errors.email.message}</Form.Text>
              ) : (
                <Form.Text className="ms-1">Non condivideremo la tua email con nessuno.</Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="ms-1">Password</Form.Label>
              <Form.Control
                {...register("password", {
                  required: "La password è obbligatoria.",
                })}
                value={password}
                type="password"
                placeholder="Inserisci la tua password"
                onChange={e => dispatch(setPassword(e.target.value))}
              />
              {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
              <Form.Text className="ms-1">
                <br />
                Non ricordi la password ?{" "}
                <Link to={"/password-dimenticata"} className="cras-links">
                  Clicca qui.
                </Link>
              </Form.Text>
            </Form.Group>

            <Button disabled={isSubmitting} className="login-btn text-center" type="submit">
              {isSubmitting ? "Caricamento..." : "Accedi"}
            </Button>
            <div className="text-center mt-3">
              <p>
                Prima volta qui ?{" "}
                <Link to={"/registrati"} className="cras-links">
                  Registrati!
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default LoginPage;
