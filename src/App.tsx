import { useEffect, useState } from "react";
import MoviesContextProvider from "./context/MovieContext";
import StarWars from "./pages/star-wars";
import { getAllMovies } from "./services/Movies.service";

const App: React.FC = () => {
  const [allMovies, setAllMovies] = useState<SwapiMoviesResult[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllMovies()
      .then(setAllMovies)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <>Loading...</>;
  if (isError) return <>Error...</>;
  return (
    <MoviesContextProvider data={allMovies}>
      <StarWars />
    </MoviesContextProvider>
  );
};

export default App;
