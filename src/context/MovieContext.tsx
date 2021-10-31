import { useContext, createContext, useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useToggler } from "../hooks/useToggler";

// Init Context
///@ts-ignore
const MoviesContext = createContext<MoviesValue>({});

// useMovies Hook
export const useMovies = () => useContext(MoviesContext);

const MoviesContextProvider: React.FC<MoviesProviderProps> = ({
  children,
  data,
}) => {
  // State
  const [favoriteMovies, setFavoriteMovies] = useState<FavoriteMovie[]>([]);
  const [getCachedFavMovies, setCachedFavMovies] =
    useLocalStorage<FavoriteMovie[]>("favoriteMovies");
  const [updateLocalStorage, toggleUpdateLocalStorage] = useToggler(false);
  const [currentMovie, setCurrentMovie] = useState<SwapiMoviesResult>(data[0]);
  // On load getting all favorite movies from local storage
  useEffect(() => {
    const cachedFavMovies = getCachedFavMovies();
    if (cachedFavMovies) {
      if (Array.isArray(cachedFavMovies)) {
        setFavoriteMovies(cachedFavMovies);
        if (cachedFavMovies[0]) {
          setCurrentMovie(
            data.find(
              (movie) => movie.episode_id === cachedFavMovies[0].episodeId
            ) || data[0]
          );
        }
      }
    }
  }, [data, getCachedFavMovies]);
  /** Every time the user updates favorite Movies state the use effect will save it in localStorage */
  useEffect(() => {
    if (updateLocalStorage) {
      setCachedFavMovies(favoriteMovies);
      toggleUpdateLocalStorage();
    }
  }, [
    updateLocalStorage,
    favoriteMovies,
    toggleUpdateLocalStorage,
    setCachedFavMovies,
  ]);
  // Helper functions
  /** Returns one movie by episode id or undefined */
  const _findOneMovieByEpisodeId = (episodeId: number) => {
    return data.find((movie) => movie.episode_id === episodeId);
  };
  /** Returns all movies from data prop sorted by episode id */
  const getAllMoviesNames = () => {
    const allMoviesNames: MovieName[] = data.map((movie) => ({
      title: movie.title,
      episodeId: movie.episode_id,
      isFavorite: !!favoriteMovies.find(
        (favMovie) => favMovie.episodeId === movie.episode_id
      ),
    }));
    allMoviesNames.sort((a, b) => a.episodeId - b.episodeId);
    return allMoviesNames;
  };
  /** Pushes new favorite movie to favoriteMovies state */
  const setNewFavoriteMovie = (episodeId: number) => {
    if (!episodeId) return;
    favoriteMovies.push({ episodeId });
    toggleUpdateLocalStorage();
  };
  /** Filters favoriteMovies array to remove movie  */
  const removeFavoriteMovie = (episodeId: number) => {
    if (!episodeId) return;
    setFavoriteMovies((prev) =>
      prev.filter((movie) => movie.episodeId !== episodeId)
    );
    toggleUpdateLocalStorage();
  };
  /** Changes the current movie state to be the selected movie if it exists */
  const changeCurrentMovie = (episodeId: number) => {
    if (!episodeId) return;
    const selectedMovie = _findOneMovieByEpisodeId(episodeId);
    if (selectedMovie) setCurrentMovie(selectedMovie);
  };
  // Value
  const value: MoviesValue = {
    currentMovie,
    getAllMoviesNames,
    changeCurrentMovie,
    setNewFavoriteMovie,
    removeFavoriteMovie,
  };
  // Provider
  return (
    <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
  );
};

export default MoviesContextProvider;

interface MoviesValue {
  currentMovie: SwapiMoviesResult;
  getAllMoviesNames: () => MovieName[];
  changeCurrentMovie: (episodeId: number) => void;
  setNewFavoriteMovie: (episodeId: number) => void;
  removeFavoriteMovie: (episodeId: number) => void;
}

interface MoviesProviderProps {
  data: SwapiMoviesResult[];
}
