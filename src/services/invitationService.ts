import { api } from "./api";

export const getInvitationData = async (invitationCode: string) => {
  try {
    const response = await api.get(`invitation/${invitationCode}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching invitation data:", error);
    throw error;
  }
};

export const getPassData = async (invitationCode: string) => {
  try {
    const response = await api.get(`pass/${invitationCode}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching invitation data:", error);
    throw error;
  }
};

export const updateInvitationData = async (
  invitationCode: string,
  data: any
) => {
  try {
    console.log("updateInvitationData invitation data:", data);
    const response = await api.post(`invitation/rsvp/${invitationCode}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating invitation data:", error);
    throw error;
  }
};
