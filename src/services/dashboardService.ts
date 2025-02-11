import { api } from "./api";

export const getDashboardData = async () => {
  try {
    const response = await api.get("admin/dashboard");
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};
