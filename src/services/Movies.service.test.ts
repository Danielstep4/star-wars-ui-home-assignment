import { getAllMovies, fetchMovieDetails } from "./Movies.service";

test("getAllMovies func has to return an array with data or an empty array", () => {
  return getAllMovies().then((data) => {
    expect(data).toBeTruthy();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThanOrEqual(0);
  });
});

test("fetchMovieDetails func has to return an array with data or an empty array", () => {
  return fetchMovieDetails([]).then((data) => {
    expect(data).toBeTruthy();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(0);
  });
});
