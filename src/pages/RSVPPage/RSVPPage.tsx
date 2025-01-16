import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Image, message } from "antd";
import { WhatToWearSection } from "./Sections/WhatToWearSection";
import { WeddingInvitationSection } from "./Sections/WeddingInvitationSection";
import { RSVPSection } from "./Sections/RSVPSection";
import lilac_beige_orbs_bg from "../../assets/rsvp/lilac_beige_orbs_bg.jpg";
import wedding_invitation_vips from "../../assets/rsvp/wedding_invitation_vips.png";
import { api } from "../../services/api";
import smoke from "../../assets/rsvp/smoke.png";

const RSVPPage = () => {
  const { invitationCode } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/invitation/${invitationCode}`);
      } catch (error: any) {
        message.error(error.response.data.error);
        window.location.href = "/error";
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [invitationCode]);

  if (isLoading) {
    return (
      <h1 className="fixed inset-0 z-50 flex justify-center">Loading...</h1>
    );
  } else {
    return (
      <div className="w-full flex flex-col items-center">
        <div className="fixed inset-0 -z-10 opacity-20">
          <img
            src={lilac_beige_orbs_bg}
            alt="background"
            className="w-screen h-screen object-cover blur-sm"
          />
        </div>

        {/* WEDDING INVITATION */}
        <WeddingInvitationSection />

        {/* ENTOURAGE LISTS */}
        <div className="relative h-full flex items-center justify-center overflow-hidden shadow-md rounded-t-lg">
          <Image
            preview={false}
            src={wedding_invitation_vips}
            alt="Vips"
            className="w-full min-w-xs max-w-lg mix-blend-multiply"
          />

          {/* Smoke Background */}
          <div className="absolute inset-0 pointer-events-none animate-pulse-slow">
            <Image src={smoke} alt="Smoke" className="object-cover" />
          </div>
          <div className="absolute right-0 top-0 pointer-events-none animate-pulse-slow">
            <Image src={smoke} alt="Smoke" className="object-cover" />
          </div>
          <div className="absolute inset-0 pointer-events-none animate-pulse-slow">
            <Image src={smoke} alt="Smoke" className="object-cover" />
          </div>
        </div>

        {/* WHAT TO WEAR */}
        <WhatToWearSection />

        {/* RVSP */}
        <RSVPSection />
      </div>
    );
  }
};

export default RSVPPage;
