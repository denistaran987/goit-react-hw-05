import axios from 'axios';

const VITE_TOKEN_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiY2FjNWNlNWViZGMwMWIxMmU0M2NhMWMyNWJiMGZkZiIsIm5iZiI6MTczMjAzNTY4Mi4wMjk2OTg4LCJzdWIiOiI2NzNjYzEwZDYwYjdiM2JjOTRhMGNkOGYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.8ok70QId4WDs3fyj1k-pNNZnfo4UaZMLc8xl7qjKsUQ';

const options = {
  headers: {
    Authorization: `Bearer ${VITE_TOKEN_KEY}`,
  },
};

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const fetchTrendingMovies = async () => {
  const { data } = await axios.get('/trending/movie/day?language=en-US', options);
  return data;
};

const fetchMovieByQuery = async query => {
  const { data } = await axios.get(
    `/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
    options
  );
  return data;
};

const fetchMovieInfoById = async newId => {
  const response = await axios.get(`/movie/${newId}?language=en-US`, options);
  return response;
};

const fetchMovieActorsInfo = async newId => {
  const { data } = await axios.get(`/movie/${newId}/credits?language=en-US`, options);
  return data.cast;
};

const fetchMovieReviews = async newId => {
  const { data } = await axios.get(`/movie/${newId}/reviews?language=en-US&page=1`, options);
  return data;
};

export {
  fetchTrendingMovies,
  fetchMovieByQuery,
  fetchMovieInfoById,
  fetchMovieActorsInfo,
  fetchMovieReviews,
};
