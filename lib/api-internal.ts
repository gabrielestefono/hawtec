import axios from "axios";

export const apiInternal = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_APP_URL}/api`,
  withCredentials: true,
  validateStatus: () => true
});