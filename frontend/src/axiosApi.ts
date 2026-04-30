import axios from "axios";
import {apiURL} from "./constants.ts";

const axiosApi = axios.create({
    baseURL: apiURL
});

axiosApi.defaults.withCredentials = true;

const logoutAndRedirect = async () => {
  try {
      await axios.delete(`${apiURL}/users/sessions`, {withCredentials: true, timeout: 2000});
  } catch (e) {
      console.log('Could not notify api about logout', e);
  }

  try {
      const {store} = await import('./app/store.ts');
      const {resetUser} = await import('./components/users/store/usersSlice.ts');

      store.dispatch(resetUser());
  } catch (e) {
      console.log('Redux store not found.', e);
  }

  if (window.location.pathname !== '/login') {
      window.location.replace('/login');
  }
};

axiosApi.interceptors.response.use((response) => response, async (error) => {
   const originalRequest = error.config;

   if (error.response?.status === 401 &&
       originalRequest &&
       !originalRequest._retry &&
       originalRequest.url !== '/users/sessions'
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
});



export default axiosApi;