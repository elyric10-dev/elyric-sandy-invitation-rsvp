import axios from "axios";

export const api = axios.create({
  baseURL: "https://api-rsvp.elyricm.cloud/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
