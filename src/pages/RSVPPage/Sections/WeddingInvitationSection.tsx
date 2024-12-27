import { WeddingInvitationCard } from "../../../component/Card/WeddingInvitationCard";
import esLogo from "../../../assets/rsvp/RSVP_logo.png";
import { useParams } from "react-router-dom";

export const WeddingInvitationSection = () => {
  const params = useParams();
  const invitationCode = params.invitationCode || "";

  return (
    <>
      {/* INVITATION */}
      <WeddingInvitationCard
        invitationCode={invitationCode}
        headerLogoUrl={esLogo}
        groomName="Elyric"
        brideName="Sandy"
        eventMonth="March"
        eventDate="01"
        eventYear="2025"
        eventDay="Saturday"
        eventTime="03:00PM"
        eventVenue="Crowne Garden Hotel"
        eventVenueLocated="3rd floor Grand Ballroom"
        eventAddress="Salinas Dr, Cebu City, 6000 Cebu"
        coupleHashtag="#ifinELYfoundmySANshine"
      />
    </>
  );
};
