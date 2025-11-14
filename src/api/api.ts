import axios from "axios";
import Router from "next/router";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const API = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  validateStatus: (status) => status < 500,
  headers: {
    "Content-Type": "application/json"
  }
});

// 응답 인터셉터 - 에러 처리
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Response error:", error);
    if (error.response?.status === 401) {
      Router.push("/");
    }
    return Promise.reject(error);
  }
);

export default API;
