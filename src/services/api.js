import axios from 'axios';

const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiY2FjNWNlNWViZGMwMWIxMmU0M2NhMWMyNWJiMGZkZiIsIm5iZiI6MTczMjAzNTY4Mi4wMjk2OTg4LCJzdWIiOiI2NzNjYzEwZDYwYjdiM2JjOTRhMGNkOGYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.8ok70QId4WDs3fyj1k-pNNZnfo4UaZMLc8xl7qjKsUQ';

const options = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const fetchTrendingMovies = async () => {
  const { data } = await axios.get(
    'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
    options
  );
  return data;
};
