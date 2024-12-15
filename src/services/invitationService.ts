import axios from "axios";
const api = axios.create({
  baseURL: "https://api-rsvp.elyricm.cloud/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getInvitationData = async (invitationCode: string) => {
  try {
    const response = await api.get(`api/invitation/${invitationCode}`);
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
    const response = await api.post(
      `api/invitation/rsvp/${invitationCode}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error updating invitation data:", error);
    throw error;
  }
};
