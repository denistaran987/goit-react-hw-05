import { useEffect, useState } from 'react';
import { fetchMovieActorsInfo } from '../../services/api';
import Loader from '../Loader/Loader';
import { useParams } from 'react-router-dom';
import s from './MovieCast.module.css';
import ErrorNotice from '../ErrorNotice/ErrorNotice';
import ButtonUp from '../ButtonUp/ButtonUp';

const MovieCast = () => {
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsErorr] = useState(false);
  const [actors, setActors] = useState(null);
  const [buttonUp, setButtonUp] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 700,
        behavior: 'smooth',
      });
    }, 400);

    const handleScroll = () => {
      setButtonUp(window.scrollY >= 448);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const getMovieActorsInfo = async () => {
      try {
        setIsLoading(true);
        setIsErorr(false);
        const info = await fetchMovieActorsInfo(movieId);
        console.log(info);
        setActors(info);
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
    <div className={s.section}>
      {buttonUp && <ButtonUp />}
      {actors && (
        <ul className={s.list}>
          {actors.map(({ id, name, character, profile_path }) => {
            return (
              <li className={s.item} key={id}>
                <img
                  className={s.image}
                  src={
                    profile_path
                      ? `https://image.tmdb.org/t/p/w500${profile_path}`
                      : `https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg`
                  }
                  alt="actors photo"
                />
                <h2>{name}</h2>
                <span>{character}</span>
              </li>
            );
          })}
        </ul>
      )}
      {isLoading && <Loader />}
      {!isLoading && actors && actors.length === 0 && (
        <p className={s.error}>
          Sorry, no information about the actors was found. Please try again.
        </p>
      )}
      {error && <ErrorNotice />}
    </div>
  );
};
export default MovieCast;
