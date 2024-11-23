import { Link, useLocation } from 'react-router-dom';
import s from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul>
      {movies.map(movie => {
        return (
          <li key={movie.id}>
            <Link className={s.link} to={`/movies/${movie.id.toString()}`} state={location}>
              {movie.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
export default MovieList;
