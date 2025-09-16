import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { animalCRUDFetch } from "../../redux/actions/animalSlice";
import { toast } from "react-toastify";
import type { NewAnimal } from "../../interfaces/Animal";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

type FormFields = {
  id?: number | null;
  name: string;
  age: string;
  gender: string;
  species: string;
  breed: string;
  description: string;
  clinicalCondition: string;
  status: string;
  imageUrl?: string;
  entryDate?: Date | null;
  releaseDate?: Date | null;
  city: string;
  province: string;
  region: string;
  userEmail: string;
  userName: string;
  userSurname: string;
  userPhoneNumber: string;
  deathDate?: Date | null;
  deathCause?: string | null;
  adoptable?: boolean;
};

const emptyAnimal: NewAnimal = {
  name: "",
  age: "",
  gender: "",
  species: "",
  breed: "",
  description: "",
  clinicalCondition: "",
  status: "",
  city: "",
  province: "",
  region: "",
  userEmail: "",
  userName: "",
  userSurname: "",
  userPhoneNumber: "",
  imageUrl: "",
};

const AnimalForm = () => {
  const { single } = useAppSelector(state => state.animals.data);
  const dispatch = useAppDispatch();
  const { animalId } = useParams();
  const isUpdatePage = location.pathname.includes("modifica");

  useEffect(() => {
    if (animalId && isUpdatePage) {
      dispatch(animalCRUDFetch({ animalId: animalId, method: "GET", animalData: null }));
    }
  }, [animalId, isUpdatePage, dispatch]);

  const defaultValues =
    isUpdatePage && single
      ? {
          ...single,
          userName: single.foundBy?.userName,
          userSurname: single.foundBy?.userSurname,
          userEmail: single.foundBy?.userEmail,
          userPhoneNumber: single.foundBy?.userPhoneNumber,
        }
      : emptyAnimal;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ defaultValues: defaultValues });

  useEffect(() => {
    if (isUpdatePage && single) {
      reset({
        ...single,
        userName: single.foundBy?.userName,
        userSurname: single.foundBy?.userSurname,
        userEmail: single.foundBy?.userEmail,
        userPhoneNumber: single.foundBy?.userPhoneNumber,
      });
    }
  }, [isUpdatePage, single, reset]);

  const onSubmit: SubmitHandler<FormFields> = async data => {
    try {
      const method = isUpdatePage ? "PUT" : "POST";

      await toast.promise(
        dispatch(animalCRUDFetch({ animalId: animalId, method, animalData: data })).unwrap(),
        {
          pending: isUpdatePage ? "Modifica in corso..." : "Aggiunta in corso...",
          success: isUpdatePage ? "Animale modificato con successo!" : "Animale aggiunto con successo!",
          error: isUpdatePage ? "Modifica fallita. Riprovare." : "Aggiunta fallita. Riprovare.",
        },
        {
          autoClose: 4000,
        }
      );

      reset();
    } catch (error) {
      console.error("Errore durante la fetch dell'animale:", error);
    }
  };

  return (
    <>
      <Form className="w-100" onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Form.Group as={Col} xs={12} sm={6} lg={4} controlId="formGridName" className="mt-3">
            <Form.Label className="fst-italic fw-semibold">Nome</Form.Label>
            <Form.Control
              {...register("name", {
                required: "Il nome è obbligatorio",
                minLength: {
                  message: "Il nome deve avere almeno 3 caratteri.",
                  value: 3,
                },
              })}
              autoComplete="off"
              className="form-inputs"
              type="text"
              placeholder="Inserisci il nome dell'animale"
            />
            {errors.name && <p className="text-danger mt-1">{errors.name.message}</p>}
          </Form.Group>

          <Form.Group as={Col} xs={12} sm={6} lg={4} controlId="formGridAge" className="mt-3">
            <Form.Label className="fst-italic fw-semibold">Età</Form.Label>
            <Form.Control
              {...register("age", {
                required: "L'età è obbligatoria",
              })}
              autoComplete="off"
              className="form-inputs"
              type="number"
              placeholder="Inserisci l'età dell'animale"
            />
            {errors.age && <p className="text-danger mt-1">{errors.age.message}</p>}
          </Form.Group>

          <Form.Group as={Col} xs={12} sm={6} lg={4} controlId="formGridImgUrl" className="mt-3">
            <Form.Label className="fst-italic fw-semibold">Immagine</Form.Label>
            <Form.Control {...register("imageUrl")} autoComplete="off" className="form-inputs" type="text" placeholder="Inserisci un'immagine dell'animale" />
          </Form.Group>

          <Form.Group as={Col} xs={12} sm={6} lg={3} controlId="formGridSpecies" className="mt-3">
            <Form.Label className="fst-italic fw-semibold">Specie</Form.Label>
            <Form.Control
              {...register("species", { required: "La specie è obbligatoria" })}
              autoComplete="off"
              className="form-inputs"
              type="text"
              placeholder="Inserisci la specie dell'animale"
            />
            {errors.species && <p className="text-danger mt-1">{errors.species.message}</p>}
          </Form.Group>

          <Form.Group as={Col} xs={12} sm={6} lg={3} controlId="formGridBreed" className="mt-3">
            <Form.Label className="fst-italic fw-semibold">Razza</Form.Label>
            <Form.Control
              {...register("breed", { required: "La razza è obbligatoria" })}
              autoComplete="off"
              className="form-inputs"
              type="text"
              placeholder="Inserisci la razza dell'animale"
            />
            {errors.breed && <p className="text-danger mt-1">{errors.breed.message}</p>}
          </Form.Group>

          <Form.Group as={Col} xs={12} sm={6} lg={3} controlId="formGridGender" className="mt-3">
            <Form.Label className="fst-italic fw-semibold">Sesso</Form.Label>
            <Form.Select {...register("gender", { required: "Il sesso è obbligatorio" })} className="border border-dark">
              <option value={"MALE"}>Maschio</option>
              <option value={"FEMALE"}>Femmina</option>
            </Form.Select>
            {errors.gender && <p className="text-danger mt-1">{errors.gender.message}</p>}
          </Form.Group>

          <Form.Group as={Col} xs={12} sm={6} lg={3} controlId="formGridGender" className="mt-3">
            <Form.Label className="fst-italic fw-semibold">Status</Form.Label>
            <Form.Select {...register("status", { required: "Lo status è obbligatorio" })} className="border border-dark">
              <option value={"HOSPITALIZED"}>Ricoverato</option>
              <option value={"RELEASED"}>Rilasciato</option>
              <option value={"DEAD"}>Deceduto</option>
            </Form.Select>
            {errors.status && <p className="text-danger mt-1">{errors.status.message}</p>}
          </Form.Group>

          <Form.Group as={Col} xs={12} sm={6} lg={4} controlId="formGridCity" className="mt-3">
            <Form.Label className="fst-italic fw-semibold">Città</Form.Label>
            <Form.Control
              {...register("city", { required: "La città è obbligatoria" })}
              autoComplete="off"
              className="form-inputs"
              type="text"
              placeholder="Inserisci la città in cui è stato trovato l'animale"
            />
            {errors.city && <p className="text-danger mt-1">{errors.city.message}</p>}
          </Form.Group>

          <Form.Group as={Col} xs={12} sm={6} lg={4} controlId="formGridProvince" className="mt-3">
            <Form.Label className="fst-italic fw-semibold">Provincia</Form.Label>
            <Form.Control
              {...register("province", { required: "La provincia è obbligatoria" })}
              autoComplete="off"
              className="form-inputs"
              type="text"
              placeholder="Inserisci la provincia in cui è stato trovato l'animale"
            />
            {errors.province && <p className="text-danger mt-1">{errors.province.message}</p>}
          </Form.Group>

          <Form.Group as={Col} xs={12} sm={6} lg={4} controlId="formGridRegion" className="mt-3">
            <Form.Label className="fst-italic fw-semibold">Regione</Form.Label>
            <Form.Control
              {...register("region", { required: "La regione è obbligatoria" })}
              autoComplete="off"
              className="form-inputs"
              type="text"
              placeholder="Inserisci la regione in cui è stato trovato l'animale"
            />
            {errors.region && <p className="text-danger mt-1">{errors.region.message}</p>}
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} xs={12} sm={6} controlId="formGridDescription" className="mt-3">
            <Form.Label className="fst-italic fw-semibold">Descrizione</Form.Label>
            <Form.Control
              {...register("description", { required: "La descrizione è obbligatoria" })}
              as="textarea"
              rows={3}
              autoComplete="off"
              className="form-inputs"
              type="text"
              placeholder="Inserisci una descrizione dell'animale"
            />
            {errors.description && <p className="text-danger mt-1">{errors.description.message}</p>}
          </Form.Group>

          <Form.Group as={Col} xs={12} sm={6} controlId="formGridClinicalCondition" className="mt-3">
            <Form.Label className="fst-italic fw-semibold">Condizione Clinica</Form.Label>
            <Form.Control
              {...register("clinicalCondition", { required: "La condizione clinica è obbligatoria" })}
              as="textarea"
              rows={3}
              autoComplete="off"
              className="form-inputs"
              type="text"
              placeholder="Inserisci la situazione clinica dell'animale"
            />
            {errors.clinicalCondition && <p className="text-danger mt-1">{errors.clinicalCondition.message}</p>}
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} xs={12} sm={6} controlId="formGridName" className="mt-3">
            <Form.Label className="fst-italic fw-semibold">Nome del/la Cittadino/a</Form.Label>
            <Form.Control
              {...register("userName", { required: "Il nome del cittadino è obbligatorio" })}
              autoComplete="off"
              className="form-inputs"
              type="text"
              placeholder="Inserisci il nome di chi ha ritrovato l'animale"
            />
            {errors.userName && <p className="text-danger mt-1">{errors.userName.message}</p>}
          </Form.Group>

          <Form.Group as={Col} xs={12} sm={6} controlId="formGridSurname" className="mt-3">
            <Form.Label className="fst-italic fw-semibold">Cognome del/la Cittadino/a</Form.Label>
            <Form.Control
              {...register("userSurname", { required: "Il cognome del cittadino è obbligatorio" })}
              autoComplete="off"
              className="form-inputs"
              type="text"
              placeholder="Inserisci il cognome di chi ha ritrovato l'animale"
            />
            {errors.userSurname && <p className="text-danger mt-1">{errors.userSurname.message}</p>}
          </Form.Group>

          <Form.Group as={Col} xs={12} sm={6} controlId="formGridEmail" className="mt-3">
            <Form.Label className="fst-italic fw-semibold">Email del/la Cittadino/a</Form.Label>
            <Form.Control
              {...register("userEmail", {
                required: "L'email del cittadino è obbligatoria",
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Formato email non valido.",
                },
              })}
              autoComplete="off"
              className="form-inputs"
              type="email"
              placeholder="Inserisci email di chi ha ritrovato l'animale"
            />
            {errors.userEmail && <p className="text-danger mt-1">{errors.userEmail.message}</p>}
          </Form.Group>

          <Form.Group as={Col} xs={12} sm={6} controlId="formGridPhone" className="mt-3">
            <Form.Label className="fst-italic fw-semibold">Numero di Telefono del/la Cittadino/a</Form.Label>
            <Form.Control
              {...register("userPhoneNumber", { required: "Il numero di telefono del cittadino è obbligatorio" })}
              autoComplete="off"
              className="form-inputs"
              type="number"
              placeholder="Inserisci il telefono chi ha ritrovato l'animale"
            />
            {errors.userPhoneNumber && <p className="text-danger mt-1">{errors.userPhoneNumber.message}</p>}
          </Form.Group>
        </Row>

        {isUpdatePage && (
          <Row>
            <Form.Group as={Col} xs={12} sm={6} lg={4} controlId="formGridReleaseDate" className="mt-3">
              <Form.Label className="fst-italic fw-semibold">Data di Rilascio</Form.Label>
              <Form.Control {...register("releaseDate")} autoComplete="off" className="form-inputs" type="date" />
              {errors.releaseDate && <p className="text-danger mt-1">{errors.releaseDate.message}</p>}
            </Form.Group>

            <Form.Group as={Col} xs={12} sm={6} lg={4} controlId="formGridDeathDate" className="mt-3">
              <Form.Label className="fst-italic fw-semibold">Data del Decesso</Form.Label>
              <Form.Control {...register("deathDate")} autoComplete="off" className="form-inputs" type="date" />
              {errors.deathDate && <p className="text-danger mt-1">{errors.deathDate.message}</p>}
            </Form.Group>

            <Form.Group as={Col} xs={12} sm={6} lg={4} controlId="formGridPhone" className="mt-3">
              <Form.Label className="fst-italic fw-semibold">Causa del Decesso</Form.Label>
              <Form.Control {...register("deathCause")} autoComplete="off" className="form-inputs" type="text" placeholder="Inserisci la causa del decesso" />
              {errors.deathCause && <p className="text-danger mt-1">{errors.deathCause.message}</p>}
            </Form.Group>
          </Row>
        )}

        <div className="d-flex justify-content-center mt-4">
          <Button disabled={isSubmitting} variant="outline-none" className="add-update-animal-btn" type="submit">
            {isSubmitting ? "Caricamento..." : isUpdatePage ? "Modifica animale" : "Aggiungi animale"}
          </Button>
        </div>
      </Form>
    </>
  );
};

export default AnimalForm;
