import { Suspense, useEffect, useRef, useState } from 'react';
import { fetchMovieInfoById } from '../services/api';
import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';
import Loader from '../components/Loader/Loader';
import ErrorNotice from '../components/ErrorNotice/ErrorNotice';
import s from './MoviesDetailsPage.module.css';
import clsx from 'clsx';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieInfo, setMovieInfo] = useState({});
  const [loader, setLoader] = useState(false);
  const [error, setIsErorr] = useState(false);
  const { state } = useLocation();
  const goBackLink = useRef(state ?? '/movies');

  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };

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
          <Link to={goBackLink.current}>
            <button className={s.button} type="button">
              <FaArrowLeftLong />
              Go Back
            </button>
          </Link>
          <div className={s['left-box']}>
            <img
              className={s.image}
              src={
                poster_path
                  ? imageURL
                  : `https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg`
              }
              alt="photo poster"
            />
            <nav className={s.nav}>
              <NavLink className={buildLinkClass} to="cast">
                Cast
              </NavLink>
              <NavLink className={buildLinkClass} to="reviews">
                Reviews
              </NavLink>
            </nav>
          </div>
          <div className={s['right-box']}>
            <h1 className={s.title}>{`${title} (${releaseDate})`}</h1>
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
        <Suspense>
          <Outlet />
        </Suspense>
        {loader && <Loader></Loader>}
        {error && <ErrorNotice />}
      </div>
    </section>
  );
};

export default MovieDetailsPage;
