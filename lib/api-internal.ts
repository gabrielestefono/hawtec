import axios from "axios";

export const apiInternal = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});
