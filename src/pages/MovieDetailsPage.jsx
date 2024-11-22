import { useEffect, useState } from 'react';
import { fetchMovieInfoById } from '../services/api';
import { Link, NavLink, Outlet, useParams } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import ErrorNotice from '../components/ErrorNotice/ErrorNotice';
import s from './MoviesDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieInfo, setMovieInfo] = useState({});
  const [loader, setLoader] = useState(false);
  const [error, setIsErorr] = useState(false);

  useEffect(() => {
    const getMovieInfo = async () => {
      try {
        setLoader(true);
        setIsErorr(false);
        const { data } = await fetchMovieInfoById(movieId);
        setMovieInfo(data);
      } catch (error) {
        console.log(error);
        setIsErorr(true);
        setMovieInfo(null);
      } finally {
        setLoader(false);
      }
    };
    getMovieInfo();
  }, [movieId]);

  if (!movieInfo) return;

  const { title, poster_path, vote_average, overview, release_date, genres } = movieInfo;

  const imageURL = `https://image.tmdb.org/t/p/w500${poster_path}`;
  const userScore = parseInt(vote_average * 10);
  const releaseDate = release_date ? release_date.slice(0, 4) : 'Unknown';

  return (
    <section className="section">
      <div className="container">
        <div className={s.wrapper}>
          <div className={s['left-box']}>
            <Link className={s.button}>
              <button type="button">Go Back</button>
            </Link>
            <img
              className={s.image}
              style={{ height: '70vh' }}
              src={
                imageURL
                  ? imageURL
                  : `https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg`
              }
              alt="photo poster"
            />
          </div>
          <div className={s['right-box']}>
            <h1 className={title}>{`${title} (${releaseDate})`}</h1>
            <span className={s.userscore}>{`User score: ${userScore}%`}</span>
            <p className={s.overview}>{overview}</p>
            {genres && (
              <ul className={s['genres-list']}>
                {genres.map((genre, index) => (
                  <li className={s['genres-item']} key={`${genre.name}-${index}`}>
                    {genre.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <nav>
          <NavLink to="cast">Cast</NavLink>
          <NavLink to="reviews">Reviews</NavLink>
        </nav>
        <Outlet />
        {loader && <Loader></Loader>}
        {error && <ErrorNotice />}
      </div>
    </section>
  );
};

export default MovieDetailsPage;
