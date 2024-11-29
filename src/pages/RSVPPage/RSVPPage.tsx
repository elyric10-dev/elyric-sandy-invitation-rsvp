import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Card, List, message, Image } from "antd";
import { WeddingInvitationCard } from "../../component/Card/WeddingInvitationCard";
import esLogo from "../../assets/rsvp/RSVP_logo.png";

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/invitation/${invitationCode}`);

        console.log("response", response);
        setGuests([...response.data.invitation.guests]);
        setSeatCount(response.data.invitation.seat_count);
      } catch (error: any) {
        message.error(error.response.data.error);
        window.location.href = "/error";
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [invitationCode]);

  const submitRSVP = async () => {
    try {
      setLoading(true);
      const response = await api.post(`/api/invite/rsvp/${invitationCode}`, {
        is_attending: true,
        party_members: guests,
      });

      console.log("response", response);
      message.success("RSVP submitted successfully!");
    } catch (error: any) {
      message.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-8">
      {/* INVITATION */}
      <WeddingInvitationCard
        headerLogoUrl={esLogo}
        groomNameFirstLetter="E"
        groomRestName="lyric"
        brideNameFirstLetter="S"
        brideRestName="andy"
        eventMonth="March"
        eventDate="01"
        eventYear="2025"
        eventDay="Saturday"
        eventTime="04:00PM"
        eventVenue="Crowne Garden Hotel"
        eventVenueLocated="3rd floor Grand Ballroom"
        eventAddress="Salinas Dr, Cebu City, 6000 Cebu"
        coupleHashtag="#ifinELYfoundmySANshine"
      />
    </div>
  );
};

export default RSVPPage;
