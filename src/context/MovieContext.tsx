import { useContext, createContext, useState, useEffect } from "react";

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
  const [favoriteMovies, setFavoriteMovies] = useState<SwapiMoviesResult[]>([]);
  // On load getting all favorite movies from local storage
  useEffect(() => {
    const data = localStorage.getItem("favoriteMovies");
    if (data) {
      const favoriteMovies = JSON.parse(data);
      if (Array.isArray(favoriteMovies)) setFavoriteMovies(favoriteMovies);
    }
  }, []);
  // Helper functions
  const getAllMoviesNames = () => {
    return data.map((movie) => movie.title);
  };
  const setNewFavoriteMovie = (movieTitle: string) => {
    if (!movieTitle) return;
    setFavoriteMovies((prev) => {
      const movie = data.find((movie) => movie.title === movieTitle);
      if (movie) {
        prev.push(movie);
      }
      return prev;
    });
    localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
  };
  // Value
  const value: MoviesValue = {
    getAllMoviesNames,
    setNewFavoriteMovie,
  };
  // Provider
  return (
    <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
  );
};

export default MoviesContextProvider;

interface MoviesValue {
  getAllMoviesNames: () => string[];
  setNewFavoriteMovie: (movieTitle: string) => void;
}

interface MoviesProviderProps {
  data: SwapiMoviesResult[];
}
