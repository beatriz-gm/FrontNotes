import axios from "axios";

export const api = axios.create({
  baseURL: "https://backnotes-2fbe.onrender.com"
});
