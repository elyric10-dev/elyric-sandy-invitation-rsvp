import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { message } from "antd";
import { WhatToWearSection } from "./Sections/WhatToWearSection";
import { WeddingInvitationSection } from "./Sections/WeddingInvitationSection";
import { RSVPSection } from "./Sections/RSVPSection";
import lilac_beige_orbs_bg from "../../assets/rsvp/lilac_beige_orbs_bg.jpg";
import { api } from "../../services/api";

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
      <div className="w-screen flex flex-col items-center">
        <div className="fixed inset-0 -z-10 opacity-20">
          <img
            src={lilac_beige_orbs_bg}
            alt="background"
            className="w-screen h-screen object-cover blur-sm"
          />
        </div>

        {/* WEDDING INVITATION */}
        <WeddingInvitationSection />

        {/* WHAT TO WEAR */}
        <WhatToWearSection />

        {/* RVSP */}
        <RSVPSection />
      </div>
    );
  }
};

export default RSVPPage;
