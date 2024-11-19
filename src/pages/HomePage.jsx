import s from './HomePage.module.css';
import '../index.css';
import MoveList from '../components/MovieList/MovieList';

const HomePage = ({ movies }) => {
  return (
    <section className="section">
      <div className="container">
        <h1 className={s.title}>Trending today</h1>
        <MoveList movies={movies} />
      </div>
    </section>
  );
};

export default HomePage;
