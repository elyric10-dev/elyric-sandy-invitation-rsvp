import { Image } from "antd";
import titleFlower from "../../assets/rsvp/RSVP_title_flower.png";
import flowerBorderTop from "../../assets/rsvp/border/border-t.png";
import flowerBorderX from "../../assets/rsvp/border/border-x.png";
import flowerBorderBottom from "../../assets/rsvp/border/border-b.png";
import smoke from "../../assets/rsvp/smoke.png";
import { useEffect, useState } from "react";
import { getInvitationData } from "../../services/invitationService";

interface IWeddingInvitationCardProps {
  invitationCode: string;
  headerLogoUrl?: any;
  groomName: string;
  brideName: string;
  eventMonth: string;
  eventDate: string;
  eventYear: string;
  eventDay: string;
  eventTime: string;
  eventVenue: string;
  eventVenueLocated: string;
  eventAddress: string;
  coupleHashtag: string;
}

export const WeddingInvitationCard = ({
  invitationCode,
  headerLogoUrl,
  groomName,
  brideName,
  eventMonth,
  eventDate,
  eventYear,
  eventDay,
  eventTime,
  eventVenue,
  eventVenueLocated,
  eventAddress,
  coupleHashtag,
}: IWeddingInvitationCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [invitationData, setInvitationData] = useState<any>([]);

  const lighterBlack = "#4e4449";
  const darkerLilac = "#7b629a";
  const lilac = "#c8a2c8";
  const gold = "#d4bc68";

  useEffect(() => {
    const fetchInvitationData = async () => {
      try {
        const response = await getInvitationData(invitationCode);
        console.log("response", response);
        setInvitationData(response.data.invitation.guests);
      } catch (error) {
        console.error("Error fetching invitation data:", error);
      }
    };
    fetchInvitationData();
  }, [invitationCode]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className="relative w-full min-w-xs max-w-lg overflow-hidden rounded-lg shadow-lg">
      {/* Smoke Background */}
      <div className="absolute inset-0 pointer-events-none animate-pulse-slow">
        <Image src={smoke} alt="Smoke" className="object-cover" />
      </div>
      <div className="absolute right-0 top-0 pointer-events-none animate-pulse-slow">
        <Image src={smoke} alt="Smoke" className="object-cover" />
      </div>

      {/* Top Border */}
      <div className="absolute top-0 left-0 w-full pointer-events-none opacity-40">
        <Image
          src={flowerBorderTop}
          onLoad={handleImageLoad}
          alt="Top Flower Border"
          className="object-cover"
        />
      </div>

      {/* Horizontal Borders */}
      <div className="absolute top-0 w-full pointer-events-none opacity-40">
        <Image
          src={flowerBorderX}
          alt="Horizontal Border"
          className="object-cover"
        />
      </div>
      <div className="absolute top-1/4 w-full pointer-events-none opacity-40">
        <Image
          src={flowerBorderX}
          alt="Horizontal Border"
          className="object-cover"
        />
      </div>
      <div className="absolute top-1/2 w-full pointer-events-none opacity-40">
        <Image
          src={flowerBorderX}
          alt="Horizontal Border"
          className="object-cover"
        />
      </div>

      {/* Bottom Border */}
      <div className="absolute -bottom-1 left-0 w-full pointer-events-none opacity-40">
        <Image
          src={flowerBorderBottom}
          alt="Bottom Flower Border"
          className="object-cover"
        />
      </div>

      {/* INVITATION CARD CONTENT */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex flex-col items-center">
          <Image
            src={headerLogoUrl}
            alt="ES logo"
            preview={false}
            width={200}
            className="w-[250px] pt-16"
          />
          <h2
            className={`font-tallowSansTC text-[20px] scale-y-[1.35]`}
            style={{ color: gold }}
          >
            SAVE THE DATE
          </h2>
          <h3 className="font-semibold" style={{ color: darkerLilac }}>
            The Wedding Of
          </h3>
        </div>

        {/* BRIDE AND GROOM NAME */}
        <div className="w-full h-80 relative flex flex-col items-center justify-center">
          <img
            src={titleFlower}
            alt="flower"
            width={300}
            height={300}
            className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
          />
          <div
            className="flex flex-col items-center justify-center"
            style={{ color: lilac }}
          >
            <h1 className="groom-bride-name text-5xl">
              <span className="font-semibold">{groomName[0]}</span>
              <span className="">{groomName.slice(1)}</span>
            </h1>
            <h2 className="groom-bride-name text-5xl">&</h2>
            <h1 className="groom-bride-name text-5xl">
              <span className="font-semibold">{brideName[0]}</span>
              <span className="">{brideName.slice(1)}</span>
            </h1>
          </div>
        </div>

        {/* DATE AND DAY */}
        <div
          className="flex items-center justify-evenly gap-4"
          style={{ color: lighterBlack }}
        >
          <div
            className="grid place-items-center w-28 montaser-arabic py-1 text-lg font-semibold border-y-[3px] border-500"
            style={{ borderColor: gold }}
          >
            <p>{eventDay}</p>
          </div>
          <div className="flex flex-col items-center gap-2 montaser-arabic text-2xl">
            <h3 className="font-semibold">{eventMonth}</h3>
            <h3 className="font-[600] text-5xl" style={{ color: darkerLilac }}>
              {eventDate}
            </h3>
            <h3 className="font-semibold">{eventYear}</h3>
          </div>
          <div>
            <div
              className="grid place-items-center w-28 montaser-arabic py-1 text-lg font-semibold border-y-[3px] border-500"
              style={{ borderColor: gold }}
            >
              <p>AT {eventTime}</p>
            </div>
          </div>
        </div>

        {/* VENUE LOCATION */}
        <div
          className="pt-6 flex flex-col items-center"
          style={{ color: lighterBlack }}
        >
          <h2 className="montaser-arabic !font-bold text-2xl">{eventVenue}</h2>
          <h2 className="courgette text-lg">{eventVenueLocated}</h2>
          <h2 className="montaser-arabic">{eventAddress}</h2>
        </div>

        <div className="relative mt-16 mb-32 py-2 px-3 bg-[#7b629a]/70 rounded overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent transform translate-x-[-150%] animate-shine"></div>
          <h2 className="text-lg lato-regular-italic text-gray-100 cursor-default relative z-10">
            {coupleHashtag}
          </h2>
        </div>
      </div>
    </div>
  );
};
