import axios from "axios";

export const request = axios.create({
    baseURL: "https://api-libreria-roxy.onrender.com/api/"
});