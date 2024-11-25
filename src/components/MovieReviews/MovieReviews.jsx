import { useEffect, useRef, useState } from 'react';
import { fetchMovieReviews } from '../../services/api';
import { useParams } from 'react-router-dom';
import ErrorNotice from '../ErrorNotice/ErrorNotice';
import Loader from '../Loader/Loader';
import s from './MovieReviews.module.css';
import ButtonUp from '../ButtonUp/ButtonUp';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsErorr] = useState(false);
  const [reviews, setReviews] = useState(null);

  const containerRef = useRef();

  useEffect(() => {
    if (!containerRef.current) return;
    if (!reviews) return;
    containerRef.current.scrollIntoView({ block: 'start', smooth: 'smooth' });
  }, [reviews]);

  useEffect(() => {
    const getMovieActorsInfo = async () => {
      try {
        setIsLoading(true);
        setIsErorr(false);
        const { results } = await fetchMovieReviews(movieId);
        setReviews(results);
      } catch (error) {
        setIsErorr(true);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieActorsInfo();
  }, [movieId]);

  return (
    <div className={s.section} ref={containerRef}>
      <ButtonUp />
      <h2 className={s.title}>Reviews</h2>
      {reviews && (
        <ul className={s.list}>
          {reviews.map(review => {
            const { id, author, content, created_at, updated_at } = review;
            return (
              <li className={s.item} key={id}>
                <h2 className={s.name}>{author}</h2>
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
      {isLoading && <Loader />}
      {!isLoading && reviews && reviews.length === 0 && (
        <p className={s.error}>Sorry, we couldn&rsquo;t find any reviews.</p>
      )}
      {error && <ErrorNotice />}
    </div>
  );
};
export default MovieReviews;
