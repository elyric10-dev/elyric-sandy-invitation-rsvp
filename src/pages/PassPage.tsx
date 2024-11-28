import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Badge, Button, Card, List, message } from "antd";
import { HeartFilled } from "@ant-design/icons";
import WeddingGatePass from "../component/WeddingGatePass";

const api = axios.create({
  baseURL: "https://api-rsvp.elyricm.cloud",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const PassPage = () => {
  const { invitationCode } = useParams();
  const [seatCount, setSeatCount] = useState(0);
  const [partyMembers, setPartyMembers] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/invite/${invitationCode}`);

        console.log("response", response);
        const defaultName = {
          id: response.data.invitation.party_members + 1,
          invitation_id:
            response.data.invitation.party_members[0].invitation_id,
          name: response.data.invitation.name,
          middle: response.data.invitation.middle,
          lastname: response.data.invitation.lastname,
        };
        setPartyMembers([
          defaultName,
          ...response.data.invitation.party_members,
        ]);
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
        party_members: partyMembers,
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
    <div className="flex flex-col justify-center items-center w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-script text-red-600 mb-2">
          Elyric & Sandy
        </h1>
        <HeartFilled className="text-red-500 text-2xl" />
      </div>

      {/* <StyledQRCode invitationUrl="elyric-sandy.elyricm.cloud/rsvp/uHwrpmw6qqJdGry7h2CsiSx92K9po7Ob" /> */}

      <Badge.Ribbon
        text="Table No: ??"
        color="#C8A2C8"
        style={{ fontSize: "1rem", padding: ".3rem", marginBottom: "1rem" }}
      >
        <WeddingGatePass
          guestName="John & Jane Smith"
          invitationCode={invitationCode}
          eventDate="March 01, 2025"
          venue="Crowne Garden Hotel"
          numberOfGuests={seatCount + 1}
          partyMembers={partyMembers}
        />
      </Badge.Ribbon>
    </div>
  );
};
