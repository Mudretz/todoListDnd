import axios from "axios";
import { BASE_URL } from "./baseUrl";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
});
