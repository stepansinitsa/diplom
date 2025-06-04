import axios, { AxiosResponse } from "axios";
import { getToken } from "../helpers/localStorage.helpers";

async function fetchData(url: string, opts: object, isFormData = false, callback?: () => void): Promise<AxiosResponse> { 
  return new Promise((resolve, reject) => {
    axios({
      baseURL: `${process.env.VITE_MAIN_URL}`,
      url,
      headers: {
        Authorization: 'Bearer ' + (getToken() || ''),
        'Content-Type': isFormData === true ? 'multipart/form-data' : 'application/json',
      },
      // responseType: 'json',
      ...opts,
    })
      .then(result => {    
        resolve(result);
      })
      .catch(error => {
        if (axios.isAxiosError(error)) {
          reject(error.response);
        } else {
          reject(error);
        }
      })
      .finally(callback);
  });}

export default fetchData;