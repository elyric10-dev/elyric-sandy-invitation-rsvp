import { openApi } from "./api";
import Cookies from "js-cookie";

// const getXsrfToken = () => {
//   const cookies = document.cookie.split(";");
//   const xsrfCookie = cookies.find((cookie) =>
//     cookie.trim().startsWith("XSRF-TOKEN=")
//   );
//   console.log("xsrfCookie:", cookies);
//   if (xsrfCookie) {
//     return decodeURIComponent(xsrfCookie.split("=")[1]);
//   }
//   return null;
// };

// function getCookie(cname: string) {
//   let name = cname + "=";
//   console.log("getCookie:", cname);
//   let decodedCookie = decodeURIComponent(document.cookie);
//   console.log("decodedCookie:", decodedCookie);
//   let ca = decodedCookie.split(";");
//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) == " ") {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) == 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
// }

const getCsrfToken = async () => {
  try {
    await openApi.get("/sanctum/csrf-cookie");

    // const token = getXsrfToken();
    // if (token) {
    //   openApi.defaults.headers.common["X-XSRF-TOKEN"] = token;
    // }
  } catch (error) {
    console.error("Error getting CSRF token:", error);
  }
};

export const login = async (email: string, password: string) => {
  try {
    // await getCsrfToken();

    // const xsrfToken = Cookies.get("XSRF-TOKEN");

    // console.log("xsrfToken: ", xsrfToken);

    // Then make the login request
    const response = await openApi.post(
      "/api/login",
      {
        email,
        password,
      }
      // {
      //   headers: {
      //     "X-XSRF-TOKEN": xsrfToken || "", // Set X-XSRF-TOKEN header
      //   },
      // }
    );

    // Store the token
    // const token = response.data.data.token;
    // localStorage.setItem("access_token", token);

    // Set token for future axios requests
    // openApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    console.log("login response:", response);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
