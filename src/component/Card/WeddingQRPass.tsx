import { Divider, Image, message, QRCode } from "antd";
import titleFlower from "../../assets/rsvp/RSVP_title_flower.png";
import flowerBorderTop from "../../assets/rsvp/border/border-t.png";
import flowerBorderX from "../../assets/rsvp/border/border-x.png";
import flowerBorderBottom from "../../assets/rsvp/border/border-b.png";
import smoke from "../../assets/rsvp/smoke.png";
import { useEffect, useState } from "react";
import { getInvitationData } from "../../services/invitationService";

interface IWeddingQRPassProps {
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

export const WeddingQRPass = ({
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
}: IWeddingQRPassProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [invitationData, setInvitationData] = useState<any>([]);

  const lighterBlack = "#4e4449";
  const darkerLilac = "#7b629a";
  const lilac = "#c8a2c8";
  const gold = "#d4bc68";
  const beige = "#f5f5dc";

  useEffect(() => {
    const fetchInvitationData = async () => {
      console.log("invitationCode", invitationCode);
      try {
        const response = await getInvitationData(invitationCode);
        console.log("response", response);
        setInvitationData(response.invitation.guests);
      } catch (error: any) {
        console.error("Error fetching invitation data:", error);
        message.error(error.response.data.error);
        window.location.href = "/error";
      }
    };
    fetchInvitationData();
  }, [invitationCode]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const qrData = JSON.stringify({
    code: invitationCode,
    type: "WEDDING_GATE_PASS",
  });

  return (
    <div className="relative w-full min-w-xs max-w-lg overflow-hidden rounded-lg shadow-lg">
      {/* Smoke Background */}
      <div className="absolute inset-0 pointer-events-none animate-pulse-slow">
        <Image src={smoke} alt="Smoke" className="object-cover" />
      </div>
      <div className="absolute right-0 top-0 pointer-events-none animate-pulse-slow">
        <Image src={smoke} alt="Smoke" className="object-cover" />
      </div>
      <div className="absolute right-0 bottom-0 pointer-events-none animate-pulse-slow">
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
            OFFICIAL EVENT PASS
          </h2>
          <h3 className="font-semibold" style={{ color: darkerLilac }}>
            The Wedding Celebration of
          </h3>
        </div>

        {/* BRIDE AND GROOM NAME */}
        <div className="w-full h-80 relative flex flex-col items-center justify-center">
          <img
            src={titleFlower}
            alt="flower"
            width={300}
            height={300}
            className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-10"
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

        {/* QR Code Section */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4">
          <h1
            className="text-4xl text-center font-semi bold"
            style={{ color: lighterBlack }}
          >
            <i>SCAN ME</i>
            <br />
            <i>AT THE VENUE!</i>
          </h1>

          {/* QR Code Section */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div
                className="absolute inset-0 border-4 border-[#C8A2C8] rounded-2xl -m-2"
                style={{ backgroundColor: beige }}
              ></div>

              <QRCode
                value={qrData}
                size={150}
                // icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                // icon={ringImage}
                iconSize={100}
                bordered={false}
                color={darkerLilac}
                style={{
                  margin: ".3rem",
                }}
              />
            </div>
          </div>
        </div>

        {/* Guest List */}
        <div className="w-full flex flex-col items-center justify-center gap-8 mt-8">
          <h2
            className="montaser-arabic !font-semibold text-2xl"
            style={{ color: lighterBlack }}
          >
            GUEST NAMES
          </h2>

          <div className="w-full flex flex-col items-center gap-2">
            {invitationData.map((guest: any) => (
              <div key={guest.id} className="">
                <div className="relative flex flex-col items-center justify-center gap-4">
                  <h3
                    className="courgette text-2xl"
                    style={{ color: darkerLilac }}
                  >
                    {guest.name} {guest.middle} {guest.lastname}
                  </h3>
                  <div
                    className="absolute w-full h-[2px] bottom-0 opacity-75"
                    style={{ backgroundColor: gold }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Divider variant="solid" style={{ borderColor: lilac }} />

        {/* QR LOVE GIFT */}

        <div className="flex flex-col items-center justify-center gap-8 leading-4">
          <div className="flex flex-col items-center justify-center px-16">
            <h2
              className={`py-4 font-tallowSansTC text-[24px] font-semibold scale-y-[1.20]`}
              style={{ color: lighterBlack }}
            >
              A Gift of Love and Support
            </h2>
            <h3
              className="courgette font-semibold leading-4"
              style={{ color: darkerLilac }}
            >
              Your presence at our wedding is the most treasured gift of all.
              However, if you wish to bless us further, we would greatly
              appreciate a contribution as we start our new journey together.
              For your convenience, you may scan the QR code to send your gift.
            </h3>
          </div>

          <div className="w-full flex flex-col items-center justify-around gap-16">
            <div
              className="relative flex flex-col items-center justify-center p-2 rounded-md"
              style={{ backgroundColor: beige }}
            >
              <div className="absolute inset-0 border-x-1 border-y-4 border-[#C8A2C8] rounded-2xl -m-2"></div>

              <QRCode
                value="00020101021127830012com.p2pqrpay0111GXCHPHM2XXX02089996440303152170200000006560417DWQM4TK3JDNZ8PTV35204601653036085802PH5908SA**Y D.6014TALAMBAN CEBU 610412346304853E"
                size={150}
                bordered={false}
                color="#0028b9"
                style={{
                  margin: ".3rem",
                }}
              />

              <div className="flex items-center mt-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/GCash_logo.svg/915px-GCash_logo.svg.png"
                  alt="Gcash Icon"
                  className="w-26 h-6" // Adjust size and margin as needed
                />
              </div>
            </div>
            <div
              className="relative flex flex-col items-center justify-center p-2 rounded-md"
              style={{ backgroundColor: beige }}
            >
              <div className="absolute inset-0 border-y-4 border-[#C8A2C8] rounded-2xl -m-2"></div>

              <QRCode
                value="00020101021127780012com.p2pqrpay0111PAPHPHM1XXX02089996440304126399120437730515+63-991-20437735204601653036085802PH5911Sandy Dupal6009Cebu City6304AB53"
                size={150}
                bordered={false}
                color="#4fa16f"
                style={{
                  margin: ".3rem",
                }}
              />

              <div className="flex items-center mt-2">
                <img
                  src="https://pnghq.com/wp-content/uploads/free-download-autodesk-maya-logo-free-unlimited-png-768x223.png"
                  alt="Gcash Icon"
                  className="w-26 h-6" // Adjust size and margin as needed
                />
              </div>
            </div>
          </div>
        </div>

        {/* Note Details */}
        <div
          className="p-2 flex flex-col items-center gap-1 mt-8 border-2 rounded-lg"
          style={{ color: lighterBlack, borderColor: lilac }}
        >
          <h2 className="montaser-arabic !font-bold">Note:</h2>
          <div className="flex flex-col items-center justify-center">
            <h2
              className="text-sm lato-regular-italic font-bold"
              style={{ lineHeight: 0.5 }}
            >
              Please present this QR code
            </h2>
            <h2 className="text-sm lato-regular-italic font-bold">
              at the entrance.
            </h2>
          </div>

          <Divider variant="dashed" style={{ borderColor: lilac, margin: 0 }} />
          <div className="text-xs text-start text-gray-500">
            <p>⚠️ This pass is required for entry</p>
            <p>⚠️ Not transferable</p>
            <p>⚠️ Valid only for the number of seats specified</p>
          </div>
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
