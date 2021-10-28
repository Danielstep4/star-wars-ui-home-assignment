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
