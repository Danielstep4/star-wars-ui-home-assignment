import { AxiosError } from "axios";

/** function that helps understand and deal with response errors */
export const axiosErrorHandler = (error: AxiosError) => {
  console.log(error.code, error.message, error.name);
  throw new Error("API Error");
};
