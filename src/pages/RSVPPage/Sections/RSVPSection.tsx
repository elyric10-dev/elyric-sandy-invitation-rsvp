import React from "react";
import { RSVPCard } from "../../../component/Card/RSVPCard";
import esLogo from "../../../assets/rsvp/RSVP_logo.png";
import { useParams } from "react-router-dom";

export const RSVPSection = () => {
  const { invitationCode } = useParams<{ invitationCode: string }>();

  const code = invitationCode || "";
  return (
    <>
      <RSVPCard invitationCode={code} headerLogoUrl={esLogo} />
    </>
  );
};
