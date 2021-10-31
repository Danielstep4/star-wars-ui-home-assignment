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
