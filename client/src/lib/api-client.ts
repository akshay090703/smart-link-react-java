import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

// const res = await apiClient.post(
//     SIGNUP_ROUTE,
//     { email, password },
//     { withCredentials: true }
//   );
