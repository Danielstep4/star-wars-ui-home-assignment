import { AxiosError } from "axios";

/** function that helps understand and deal with response errors */
export const axiosErrorHandler = (error: AxiosError) => {
  if (process.env.NODE_ENV === "development") {
    console.log(error.code, error.message, error.name);
  }
  throw new Error("Server Error");
};
