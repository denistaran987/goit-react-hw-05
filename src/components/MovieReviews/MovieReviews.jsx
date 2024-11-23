import { useEffect, useState } from 'react';
import { fetchMovieReviews } from '../../services/api';
import { useParams } from 'react-router-dom';
import ErrorNotice from '../ErrorNotice/ErrorNotice';
import Loader from '../Loader/Loader';
import s from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [loader, setLoader] = useState(false);
  const [error, setIsErorr] = useState(false);
  const [reviews, setReviews] = useState(null);

  setTimeout(() => {
    window.scrollTo({
      top: 700,
      behavior: 'smooth',
    });
  }, 400);

  useEffect(() => {
    const getMovieActorsInfo = async () => {
      try {
        setLoader(true);
        setIsErorr(false);
        const { results } = await fetchMovieReviews(movieId);
        setReviews(results);
      } catch (error) {
        setIsErorr(true);
        console.log(error);
      } finally {
        setLoader(false);
      }
    };
    getMovieActorsInfo();
  }, [movieId]);

  return (
    <div className={s.section}>
      {reviews && (
        <ul className={s.list}>
          {reviews.map(review => {
            const { id, author, content, created_at, updated_at } = review;
            return (
              <li className={s.item} key={id}>
                <h2 className={s.title}>{author}</h2>
                <p className={s.content}>{content}</p>
                <div className={s['date-container']}>
                  <span className={s.date}>
                    <strong>Created post:</strong> {created_at}
                  </span>
                  <span className={s.date}>
                    <strong>Update post:</strong> {updated_at}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {loader && <Loader />}
      {!loader && reviews && reviews.length === 0 && (
        <p className={s.error}>Sorry, we couldn&rsquo;t find any reviews.</p>
      )}
      {error && <ErrorNotice />}
    </div>
  );
};
export default MovieReviews;
