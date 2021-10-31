import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import MoviesContextProvider from "./context/MovieContext";
import StarWars from "./pages/star-wars";
import { getAllMovies } from "./services/Movies.service";
import bgImage from "./assets/starwars-bg.jpg";
import { useSessionStorage } from "./hooks/useSessionStorage";

const App: React.FC = () => {
  // Global State
  const [allMovies, setAllMovies] = useState<SwapiMoviesResult[]>([]);
  const [getCachedAllMovies, setCachedAllMovies] =
    useSessionStorage<SwapiMoviesResult[]>("all_movies");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // Onload populating allMovies state
  useEffect(() => {
    const _onLoadInit = async () => {
      const cachedAllMovies = getCachedAllMovies();
      if (cachedAllMovies) {
        setAllMovies(cachedAllMovies);
      } else {
        try {
          const result = await getAllMovies();
          setAllMovies(result);
          setCachedAllMovies(result);
        } catch (e) {
          setIsError(true);
        }
      }
    };
    _onLoadInit().finally(() => setIsLoading(false));
  }, [getCachedAllMovies, setCachedAllMovies]);

  if (isLoading)
    return (
      <div
        className="w-screen h-screen flex justify-center items-center bg-no-repeat bg-cover"
        style={{
          background: `linear-gradient(
        rgba(45, 52, 54, 0.4),
        rgba(45, 52, 54, 0.4)
      ),url(${bgImage})`,
        }}
      >
        <Loading />
      </div>
    );
  if (isError)
    return (
      <div className="bg-black text-starWars font-gothicOne h-screen w-screen text-center flex justify-center items-center text-4xl">
        Error... Sorry but the server is down, please try again later.
      </div>
    );
  return (
    <MoviesContextProvider data={allMovies}>
      <StarWars />
    </MoviesContextProvider>
  );
};

export default App;
