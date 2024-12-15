import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Card, List, message, Image } from "antd";
import { WeddingInvitationCard } from "../../component/Card/WeddingInvitationCard";
import { WhatToWearSection } from "./Sections/WhatToWearSection";
import { WeddingInvitationSection } from "./Sections/WeddingInvitationSection";
import { RSVPSection } from "./Sections/RSVPSection";

const api = axios.create({
  baseURL: "https://api-rsvp.elyricm.cloud",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const RSVPPage = () => {
  const { invitationCode } = useParams();
  const [seatCount, setSeatCount] = useState(0);
  const [guests, setGuests] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/api/invitation/${invitationCode}`);

        console.log("response", response);
        setGuests([...response.data.invitation.guests]);
        setSeatCount(response.data.invitation.seat_count);
      } catch (error: any) {
        message.error(error.response.data.error);
        window.location.href = "/error";
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [invitationCode]);

  const submitRSVP = async () => {
    try {
      setIsLoading(true);
      const response = await api.post(`/api/invite/rsvp/${invitationCode}`, {
        is_attending: true,
        party_members: guests,
      });

      console.log("response", response);
      message.success("RSVP submitted successfully!");
    } catch (error: any) {
      message.error(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <h1 className="fixed inset-0 z-50 flex justify-center">Loading...</h1>
    );
  } else {
    return (
      <div className="w-screen flex flex-col items-center">
        {/* WEDDING INVITATION */}
        {/* <WeddingInvitationSection /> */}

        {/* WHAT TO WEAR */}
        {/* <WhatToWearSection /> */}

        {/* RVSP */}
        <RSVPSection />
      </div>
    );
  }
};

export default RSVPPage;
