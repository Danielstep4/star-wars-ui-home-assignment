import { getAllMovies } from "./Movies.service";

test("getAllMovies func has to return an array with data or an empty array", () => {
  return getAllMovies().then((data) => {
    expect(data).toBeTruthy();
    expect(data).not.toBeEmpty();
  });
});
