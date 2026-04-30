import axios from "axios";
import { BASE_URL } from "./globalConst.ts";
const axiosApi = axios.create({
  baseURL: BASE_URL,
});

axiosApi.defaults.withCredentials = true;

const logoutAndRedirect = async () => {
  try {
    await axios.delete(`${BASE_URL}/users/sessions`, {
      withCredentials: true,
      timeout: 2000,
    });
  } catch (e) {
    console.log("Could not notify api about logout", e);
  }

  try {
    const { store } = await import("./app/store.ts");
    const { resetUser } = await import("./features/users/usersSlice.ts");

    store.dispatch(resetUser());
  } catch (e) {
    console.log("Redux store not found.", e);
  }

  if (window.location.pathname !== "/login") {
    window.location.replace("/login");
  }
};

axiosApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      originalRequest.url !== "/users/sessions"
    ) {
      originalRequest._retry = true;
      try {
        await logoutAndRedirect();
      } catch (e) {
        console.log(e);
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosApi;
