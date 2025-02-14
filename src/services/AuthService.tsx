import { openApi } from "./api";

export const login = async (email: string, password: string) => {
  try {
    const response = await openApi.post(
      "/api/login",
      {
        email,
        password,
      }
    );
    const token = response.data.data.token;
    localStorage.setItem("access_token", token);
    openApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
