import { useEffect, useState } from 'react';
import { fetchMovieActorsInfo } from '../../services/api';
import Loader from '../Loader/Loader';
import { useParams } from 'react-router-dom';
import s from './MovieCast.module.css';
import ErrorNotice from '../ErrorNotice/ErrorNotice';

const MovieCast = () => {
  const { movieId } = useParams();
  const [loader, setLoader] = useState(false);
  const [error, setIsErorr] = useState(false);
  const [actors, setActors] = useState(null);

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
        const info = await fetchMovieActorsInfo(movieId);
        setActors(info);
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
      {loader && <Loader />}
      {!loader && actors && actors.length === 0 && (
        <p className={s.error}>
          Sorry, no information about the actors was found. Please try again.
        </p>
      )}
      {error && <ErrorNotice />}
    </div>
  );
};
export default MovieCast;
