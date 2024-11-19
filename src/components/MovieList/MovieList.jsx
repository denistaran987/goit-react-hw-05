import { Link } from 'react-router-dom';
import s from './MovieList.module.css';

const MoveList = ({ movies }) => {
  return (
    <div>
      <ul>
        {movies.map(movie => {
          return (
            <li key={movie.id}>
              <Link className={s.link} to="/movies">
                {movie.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default MoveList;
