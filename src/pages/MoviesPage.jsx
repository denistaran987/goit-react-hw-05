import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { fetchMovieByQuery } from '../services/api';
import { useEffect, useState } from 'react';
import s from './MoviesPage.module.css';
import MovieList from '../components/MovieList/MovieList';
import { useSearchParams } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import ErrorNotice from '../components/ErrorNotice/ErrorNotice';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [moviesByQuery, setMovieByQuery] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setIsErorr] = useState(false);

  useEffect(() => {
    const newQuery = searchParams.get('query') ?? null;

    if (!newQuery) return;

    const getMovieByQuery = async () => {
      try {
        setLoader(true);
        setIsErorr(false);
        const { results } = await fetchMovieByQuery(newQuery);
        setMovieByQuery(results);
      } catch (error) {
        setMovieByQuery(null);
        setIsErorr(true);
        console.log(error);
      } finally {
        setLoader(false);
      }
    };
    getMovieByQuery();
  }, [searchParams]);

  const initialValues = {
    search: '',
  };

  const handleSubmit = (values, actions) => {
    const { search } = values;
    setSearchParams(
      {
        query: search,
      },
      { replace: true }
    );
    actions.resetForm();
  };

  const validationSchema = Yup.object({
    search: Yup.string().required('Please enter the field'),
  });

  return (
    <section className={s.section}>
      <div className="container">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          validateOnBlur={false}
        >
          <Form className={s.form}>
            <Field className={s.field} type="text" name="search"></Field>
            <button className={s.button} type="submit">
              Search
            </button>
            <ErrorMessage name="search" component="div" style={{ color: 'red' }} />
          </Form>
        </Formik>
        {moviesByQuery && <MovieList movies={moviesByQuery} />}
        {loader && <Loader />}
        {!loader && moviesByQuery && moviesByQuery.length === 0 && (
          <p style={{ color: 'red' }}>
            Sorry, no movies found for your search query. Please try again.
          </p>
        )}
        {error && <ErrorNotice />}
      </div>
    </section>
  );
};

export default MoviesPage;
