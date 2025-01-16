import { WeddingQRPass } from "../../component/Card/WeddingQRPass";
import esLogo from "../../assets/rsvp/RSVP_logo.png";
import { useParams } from "react-router-dom";

export const GatePass = () => {
  const { invitationCode } = useParams();
  return (
    <WeddingQRPass
      invitationCode={invitationCode || ""}
      headerLogoUrl={esLogo}
      groomName="Elyric"
      brideName="Sandy"
      eventMonth="March"
      eventDate="01"
      eventYear="2025"
      eventDay="Saturday"
      eventTime="03:00PM"
      eventVenue="Cebu Family Suites"
      eventAddress="27 P. Almendras St., Mabolo, Cebu City, Philippines"
      coupleHashtag="#ifinELYfoundmySANshine"
    />
  );
};
