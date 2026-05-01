import axios from "axios";

const DEFAULT_BASE_URL = "http://localhost:4000/";

export const api = axios.create({
    baseURL: (import.meta.env && import.meta.env.VITE_API_URL) || DEFAULT_BASE_URL,
});