import {
  getAllMovies,
  fetchMovieDetails,
  extractAllKeysForMoreDetails,
} from "./Movies.service";

global.axios = jest.fn(() => {
  return Promise.resolve([]);
});

test("getAllMovies func has to return an array with data or an empty array", () => {
  return getAllMovies().then((data) => {
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThanOrEqual(0);
  });
});

test("fetchMovieDetails func has to return an array with data or an empty array", () => {
  return fetchMovieDetails([]).then((data) => {
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(0);
  });
});

test("if current movie is empty expect empty arr", () => {
  expect(Array.isArray(extractAllKeysForMoreDetails({}))).toBe(true);
  expect(extractAllKeysForMoreDetails({}).length).toBe(0);
});
