import { Route, Routes } from 'react-router-dom';
import AppBar from './AppBar/AppBar';
import HomePage from '../pages/HomePage';
import MoviesPage from '../pages/MoviesPage';
import NotFoundPage from '../pages/NotFoundPage';
import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../services/api';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    try {
      const getData = async () => {
        const { results } = await fetchTrendingMovies();
        setMovies(results);
      };

      getData();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (movies.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <AppBar />

      <Routes>
        <Route path="/" element={<HomePage movies={movies} />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
