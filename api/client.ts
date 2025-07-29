import axios from "axios";

export const url = process.env.EXPO_PUBLIC_API_URL;

export const client = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});