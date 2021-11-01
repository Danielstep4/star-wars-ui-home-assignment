import { fireEvent, render, screen } from "@testing-library/react";
import MoviesContextProvider from "./MovieContext";
import { useMovies } from "./MovieContext";

test("all the functionality in context should work proparly", () => {
  const fakeData = [
    {
      title: "movie_1",
      episode_id: 1,
    },
    { title: "movie_2", episode_id: 2 },
  ];
  const TestComponent = () => {
    const {
      currentMovie,
      changeCurrentMovie,
      setNewFavoriteMovie,
      removeFavoriteMovie,
      getAllMoviesNames,
    } = useMovies();

    return (
      <>
        <div>{currentMovie.title}</div>
        <button
          role="change-current"
          onClick={() => changeCurrentMovie(2)}
        ></button>
        <div role="all_movies_titles">
          {getAllMoviesNames().map((movie) => movie.title)}
        </div>
        <div role="all_fav_titles">
          {getAllMoviesNames()
            .filter((movie) => movie.isFavorite)
            .map((movie) => movie.title)}
        </div>
        <button
          role="add_fav_1"
          onClick={() => setNewFavoriteMovie(1)}
        ></button>
        <button
          role="add_fav_2"
          onClick={() => setNewFavoriteMovie(2)}
        ></button>
        <button
          role="remove_fav_2"
          onClick={() => removeFavoriteMovie(2)}
        ></button>
      </>
    );
  };

  render(
    <MoviesContextProvider data={fakeData}>
      <TestComponent />
    </MoviesContextProvider>
  );

  expect(screen.getByText("movie_1")).toBeInTheDocument();

  fireEvent.click(screen.getByRole("change-current"));

  expect(screen.getByText("movie_2")).toBeInTheDocument();

  expect(screen.getByRole("all_movies_titles")).toHaveTextContent(
    fakeData.map((movie) => movie.title).join("")
  );

  fireEvent.click(screen.getByRole("add_fav_1"));

  expect(screen.getByRole("all_fav_titles")).toHaveTextContent("movie_1");

  fireEvent.click(screen.getByRole("add_fav_2"));

  expect(screen.getByRole("all_fav_titles")).toHaveTextContent(
    fakeData.map((movie) => movie.title).join("")
  );

  fireEvent.click(screen.getByRole("remove_fav_2"));

  expect(screen.getByRole("all_fav_titles")).toHaveTextContent("movie_1");
});
