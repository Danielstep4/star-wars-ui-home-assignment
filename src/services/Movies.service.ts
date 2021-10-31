import axios from "axios";
import { axiosErrorHandler } from "../utils/axiosErrorHandler";

/** Fetching all the movies from swapi api
 * if there is an issue it will return an empty array
 */
export const getAllMovies = async (): Promise<SwapiMoviesResult[]> => {
  try {
    const response = await axios.get("https://swapi.dev/api/films");
    const data = response.data as SwapiGetAllData;
    return data.results;
  } catch (e: any) {
    return axiosErrorHandler(e);
  }
};

/** Fetches all the data from the swapi by the urls array
 * which contains all the url end points.
 */
export const fetchMovieDetails = async (urls: string[]): Promise<string[]> => {
  try {
    const results: string[] = [];
    for (let url of urls) {
      const response = await axios.get(url);
      if (response.data && response.data.name) {
        results.push(response.data.name);
      }
    }
    return results;
  } catch (e: any) {
    return axiosErrorHandler(e);
  }
};

/** Extracts all the keys  for more details that the app can fetch from swapi
 * Function iterates on all the keys and finds only the string arrays with the needed urls
 */
export const extractAllKeysForMoreDetails = (
  currentMovie: SwapiMoviesResult
) => {
  const urlKeys: (keyof SwapiMoviesResult)[] = [];
  const allKeys = Object.keys(currentMovie) as (keyof SwapiMoviesResult)[];
  for (let key of allKeys) {
    if (Array.isArray(currentMovie[key])) {
      const array = currentMovie[key] as string[];
      if (array[0].includes("https")) urlKeys.push(key);
    }
  }
  return urlKeys;
};
