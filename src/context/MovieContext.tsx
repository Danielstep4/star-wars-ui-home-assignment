import { useContext, createContext } from "react";

// Init Context
const MoviesContext = createContext<MoviesValue>({});

// useMovies Hook
export const useMovies = () => useContext(MoviesContext);

const MoviesContextProvider: React.FC<MoviesProviderProps> = ({
  children,
  data,
}) => {
  // State
  // Helper functions
  // Value
  const value: MoviesValue = {};
  // Provider
  return (
    <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
  );
};

export default MoviesContextProvider;

interface MoviesValue {}

interface MoviesProviderProps {
  data: SwapiMoviesResult[];
}
