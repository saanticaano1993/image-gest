import axios from "axios";
import { apiUrl } from "../config";

const axiosClient = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// handle network errors
// axiosClient.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.code === "ERR_NETWORK") {
//       return Promise.reject({
//         handled: true,
//         title: "Network error",
//         message: "We could not connect to the server",
//       });
//     } else if (error.response.status === 400 || error.response.status === 401) {
//       return Promise.reject({
//         handled: true,
//         title: "Error",
//         message:
//           error.response.data?.errors[0]?.message || "Something went wrong",
//       });
//     } else if (error.response.status === 500) {
//       return Promise.reject({
//         handled: true,
//         title: "Error",
//         message: "We experienced a server error",
//       });
//     }

//     return Promise.reject({
//       handled: false,
//       title: "Unexpected Error",
//       message: "Something went wrong",
//     });
//   }
// );

export default axiosClient;
