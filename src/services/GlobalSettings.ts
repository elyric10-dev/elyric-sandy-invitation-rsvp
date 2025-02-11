import { api } from "./api"

export const getServerDate = async () => {
    try {
        const response = await api.get('/server-date')
        return response.data
    } catch (error) {
        console.error("Error fetching invitation data:", error);
    }
}