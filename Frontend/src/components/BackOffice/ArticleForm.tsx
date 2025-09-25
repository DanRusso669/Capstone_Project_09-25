import { useEffect } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useParams } from "react-router-dom";
import { articleCRUDFetch } from "../../redux/actions/articleSlice";
import { toast } from "react-toastify";

type FormFields = {
  title: string;
  content: string;
  articleImg: string;
};

const ArticleForm = () => {
  const { single } = useAppSelector(state => state.articles.data);
  const isUpdatePage = location.pathname.includes("/modifica/articoli");
  const dispatch = useAppDispatch();
  const { articleId } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({});

  useEffect(() => {
    if (articleId && isUpdatePage) {
      dispatch(articleCRUDFetch({ articleId, method: "GET", articleData: null }));
    }
  }, [articleId, dispatch, isUpdatePage]);

  useEffect(() => {
    if (isUpdatePage && single) {
      reset({
        ...single,
      });
    }
  }, [isUpdatePage, single, reset]);

  const onSubmit: SubmitHandler<FormFields> = async data => {
    try {
      const method = isUpdatePage ? "PUT" : "POST";

      await toast.promise(
        dispatch(articleCRUDFetch({ articleId, method, articleData: data })).unwrap(),
        {
          pending: isUpdatePage ? "Modifica in corso..." : "Salvataggio in corso...",
          success: isUpdatePage ? "Articolo modificato con successo!" : "Articolo salvato con successo!",
          error: isUpdatePage ? "Modifica fallita. Riprovare." : "Salvataggio fallito. Riprovare.",
        },
        {
          autoClose: 4000,
        }
      );

      reset();
    } catch (error) {
      toast.error("Errore durante la fetch dell'articolo: " + error);
    }
  };

  return (
    <>
      <Form className="w-100 d-flex flex-column justify-content-center align-items-center text-center mb-4" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group as={Col} xs={12} sm={6} lg={4} controlId="formGridTitle" className="mt-3 w-50">
          <Form.Label className="fst-italic fw-semibold">Titolo</Form.Label>
          <Form.Control {...register("title")} autoComplete="off" className="form-inputs" type="text" placeholder="Inserisci il titolo dell'articolo" />
          {errors.title && <p className="text-danger mt-1">{errors.title.message}</p>}
        </Form.Group>

        <Form.Group as={Col} xs={12} sm={6} lg={4} controlId="formGridImgUrl" className="mt-3 w-50">
          <Form.Label className="fst-italic fw-semibold">Immagine</Form.Label>
          <Form.Control {...register("articleImg")} autoComplete="off" className="form-inputs" type="text" placeholder="Inserisci un'immagine dell'articolo" />
          {errors.articleImg && <p className="text-danger mt-1">{errors.articleImg.message}</p>}
        </Form.Group>

        <Form.Group as={Col} xs={12} sm={6} lg={4} controlId="formGridContent" className="mt-3 w-50">
          <Form.Label className="fst-italic fw-semibold">Contenuto</Form.Label>
          <Form.Control
            {...register("content")}
            as="textarea"
            rows={20}
            autoComplete="off"
            className="form-inputs"
            type="number"
            placeholder="Inserisci il contenuto dell'articolo"
          />
          {errors.content && <p className="text-danger mt-1">{errors.content.message}</p>}
        </Form.Group>

        <div className="d-flex justify-content-center mt-4">
          <Button disabled={isSubmitting} variant="outline-none" className="add-update-animal-btn" type="submit">
            {isSubmitting ? "Caricamento..." : isUpdatePage ? "Modifica articolo" : "Salva articolo"}
          </Button>
        </div>
      </Form>
    </>
  );
};

export default ArticleForm;
