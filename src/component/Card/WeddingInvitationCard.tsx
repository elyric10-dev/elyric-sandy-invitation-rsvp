import { Image } from "antd";
import titleFlower from "../../assets/rsvp/RSVP_title_flower.png";
import flowerBorderTop from "../../assets/rsvp/border/border-t.png";
import flowerBorderX from "../../assets/rsvp/border/border-x.png";
import flowerBorderBottom from "../../assets/rsvp/border/border-b.png";
import smoke from "../../assets/rsvp/smoke.png";

interface IWeddingInvitationCardProps {
  headerLogoUrl?: any;
  groomNameFirstLetter: string;
  groomRestName: string;
  brideNameFirstLetter: string;
  brideRestName: string;
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
  headerLogoUrl,
  groomNameFirstLetter,
  brideNameFirstLetter,
  groomRestName,
  brideRestName,
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
  const lighterBlack = "#4e4449";
  const darkerLilac = "#7b629a";
  const lilac = "#c8a2c8";
  const gold = "#d4bc68";

  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-lg shadow-lg">
      {/* SMOKE */}
      {/* ANIMATION SPIN */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.15] animate-pulse-slow">
        <Image
          src={smoke}
          alt="Smoke"
          preview={false}
          className="w-full h-full object-cover"
        />
      </div>

      {/* BORDER */}
      {/* TOP */}
      <div className="absolute top-0 w-full h-full pointer-events-none opacity-40">
        <Image
          src={flowerBorderTop}
          alt="Flower border"
          preview={false}
          className="w-full h-full object-cover"
        />
      </div>
      {/* border X */}
      <div className="absolute top-0 w-full h-full pointer-events-none opacity-40">
        <Image
          src={flowerBorderX}
          alt="Flower border"
          preview={false}
          className="w-full h-full object-cover"
        />
      </div>
      {/* border X */}
      <div className="absolute top-[25rem] w-full h-full pointer-events-none opacity-40">
        <Image
          src={flowerBorderX}
          alt="Flower border"
          preview={false}
          className="w-full h-full object-cover"
        />
      </div>
      {/* BOTTOM */}
      <div className="absolute top-[22rem] w-full h-full pointer-events-none opacity-40">
        <Image
          src={flowerBorderBottom}
          alt="Flower border"
          preview={false}
          className="w-full h-full object-cover"
        />
      </div>

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
              <span className="font-semibold">{groomNameFirstLetter}</span>
              <span className="">{groomRestName}</span>
            </h1>
            <h2 className="groom-bride-name text-5xl">&</h2>
            <h1 className="groom-bride-name text-5xl">
              <span className="font-semibold">{brideNameFirstLetter}</span>
              <span className="">{brideRestName}</span>
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
