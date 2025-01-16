import { WeddingInvitationCard } from "../../../component/Card/WeddingInvitationCard";
import esLogo from "../../../assets/rsvp/RSVP_logo.png";

export const WeddingInvitationSection = () => {
  return (
    <>
      {/* INVITATION */}
      <WeddingInvitationCard
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
    </>
  );
};
