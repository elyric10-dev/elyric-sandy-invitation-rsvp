import { Image } from "antd";
import flowerBorderTop from "../../assets/rsvp/border/border-t.png";
import flowerBorderX from "../../assets/rsvp/border/border-x.png";
import flowerBorderBottom from "../../assets/rsvp/border/border-b.png";
import { FaSmile, FaFrown } from "react-icons/fa";
import { FaArrowRotateLeft } from "react-icons/fa6";
import smoke from "../../assets/rsvp/smoke.png";
import { useEffect, useState } from "react";
import {
  getInvitationData,
  updateInvitationData,
} from "../../services/invitationService";

interface IWeddingInvitationCardProps {
  invitationCode: string;
  headerLogoUrl?: any;
  coupleHashtag: string;
}

export const RSVPCard = ({
  invitationCode,
  headerLogoUrl,
  coupleHashtag,
}: IWeddingInvitationCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [invitationData, setInvitationData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const lighterBlack = "#4e4449";
  const darkerLilac = "#7b629a";
  const lilac = "#c8a2c8";
  const gold = "#d4bc68";
  const beige = "#f5f5dc";

  useEffect(() => {
    const fetchInvitationData = async () => {
      try {
        const response = await getInvitationData(invitationCode);
        console.log("response", response.invitation.guests);
        setInvitationData(response.invitation.guests);
      } catch (error) {
        console.error("Error fetching invitation data:", error);
      }
    };
    fetchInvitationData();
  }, [invitationCode]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleIsAttendingClick = (id: number, isAttending: boolean) => {
    const guest = invitationData.find((guest: any) => guest.id === id);

    if (guest) guest.is_attending = isAttending;
    else console.error("Guest not found with id:", id);

    setInvitationData([...invitationData]);
  };

  const handleResetIsAttending = (id: number) => {
    const guest = invitationData.find((guest: any) => guest.id === id);

    if (guest) guest.is_attending = null;
    else console.error("Guest not found with id:", id);

    setInvitationData([...invitationData]);
  };

  const handleSubmitRSVP = async () => {
    setIsLoading(true);
    console.log("Data to pass", invitationData);

    try {
      const data = {
        party_members: invitationData,
      };
      console.log("data", data);
      const response = await updateInvitationData(invitationCode, data);

      console.log(response);

      const updatedGuests = response.invitation.guests;
      setInvitationData(updatedGuests);
    } catch (error) {
      console.error("Error updating invitation data:", error);
    } finally {
      setIsLoading(false);
    }
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
      <div className="absolute top-0 w-full pointer-events-none opacity-40">
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

      {/* RSVP CARD CONTENT */}
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3">
          <Image
            src={headerLogoUrl}
            alt="ES logo"
            preview={false}
            width={200}
            className="w-[250px] pt-16"
          />
          <h2
            className={`font-tallowSansTC text-[24px] scale-y-[1.35]`}
            style={{ color: gold }}
          >
            RSVP
          </h2>
          <div className="flex flex-col items-center justify-center leading-4">
            <h3
              className="courgette font-semibold"
              style={{ color: darkerLilac }}
            >
              We would be delighted
            </h3>
            <h3
              className="courgette font-semibold"
              style={{ color: darkerLilac }}
            >
              to have you join us on our special day!
            </h3>
          </div>

          <div
            className="flex flex-col items-center justify-center"
            style={{ color: lighterBlack }}
          >
            <span className="text-sm font-medium">WE HAVE RESERVED</span>
            <span className="flex items-center gap-1 montaser-arabic font-bold">
              <span
                className="text-3xl font-medium"
                style={{ color: darkerLilac, lineHeight: 0 }}
              >
                3
              </span>
              <span className="text-sm font-medium">SEATS IN YOUR HONOR.</span>
            </span>
          </div>

          <div
            className="flex flex-col items-center justify-center"
            style={{ color: lighterBlack }}
          >
            <h2
              className="text-sm lato-regular-italic"
              style={{ color: "darkerLilac", lineHeight: 0.8 }}
            >
              KINDLY CONFIRM YOUR ATTENDANCE BY
            </h2>
            <h2
              className="text-xl lato-regular-italic font-semibold cursor-default relative z-10"
              style={{ color: darkerLilac }}
            >
              FEBRUARY 03, 2025
            </h2>
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center gap-8">
          <h2
            className="montaser-arabic !font-semibold text-2xl"
            style={{ color: lighterBlack }}
          >
            GUEST NAMES
          </h2>

          <div className="w-full flex flex-col items-center gap-2">
            {invitationData.map((guest: any) => (
              <div key={guest.id} className="w-full h-full">
                <div
                  className="flex items-end justify-center gap-4 border-b-2 mx-2"
                  style={{ borderColor: gold }}
                >
                  <h3
                    className="courgette text-2xl"
                    style={{ color: darkerLilac }}
                  >
                    {guest.name} {guest.middle} {guest.lastname}
                  </h3>

                  {guest.is_attending === null && (
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <div
                        className="w-10 h-10 flex items-center justify-center bg-green-500 shadow-[2px_2px_4px_-1px_rgba(0,0,0,0.4)] rounded-full cursor-pointer transition duration-100 active:scale-110"
                        onClick={() => handleIsAttendingClick(guest.id, true)}
                      >
                        <FaSmile className="text-green-200" size={32} />
                      </div>
                      <div
                        className="w-10 h-10 flex items-center justify-center bg-red-500 shadow-[2px_2px_4px_-1px_rgba(0,0,0,0.4)] rounded-full cursor-pointer transition duration-100 active:scale-110"
                        onClick={() => handleIsAttendingClick(guest.id, false)}
                      >
                        <FaFrown className="text-red-200" size={32} />
                      </div>
                    </div>
                  )}

                  {guest.is_attending !== null && (
                    <div className="flex items-end justify-right gap-2 mb-1 ">
                      {guest.is_attending && (
                        <h1 className="text-green-600">Attending</h1>
                      )}
                      {!guest.is_attending && (
                        <div className="flex flex-col items-center">
                          <h1 className="text-red-600">Not</h1>
                          <h1 className="text-red-600">Attending</h1>
                        </div>
                      )}
                      <div
                        className="w-8 h-8 flex items-center justify-center shadow-[2px_2px_4px_-1px_rgba(0,0,0,0.4)] rounded-full cursor-pointer transition duration-100 active:scale-110"
                        style={{ backgroundColor: beige }}
                        onClick={() => handleResetIsAttending(guest.id)}
                      >
                        <FaArrowRotateLeft
                          className="text-blue-500"
                          size={20}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            className="bg-[#f5f5dc] text-[#7b629a] montaser-arabic !font-semibold mt-8 py-2 px-8 rounded shadow-[2px_2px_4px_-1px_rgba(0,0,0,0.4)] hover:shadow-[2px_2px_5px_-3px_rgba(0,0,0,0.4)] transition duration-100 active:scale-110 disabled:scale-100 disabled:cursor-not-allowed disabled:shadow-[2px_2px_4px_-1px_rgba(0,0,0,0.4)] disabled:bg-gray-300"
            onClick={handleSubmitRSVP}
            // If there is null in the guest list is_attend, disable the button
            disabled={
              isLoading ||
              invitationData.some((guest: any) => guest.is_attending === null)
            }
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            ) : (
              "Send RSVP"
            )}
          </button>

          {/* RSVP Details */}
          <div
            className="mt-16 px-8 py-4 flex flex-col items-center border-2 rounded-lg"
            style={{ color: lighterBlack, borderColor: lilac }}
          >
            <h2 className="montaser-arabic !font-bold">RSVP Details:</h2>
            <div className="flex flex-col items-center justify-center">
              <h2
                className="text-sm lato-regular-italic font-bold"
                style={{ lineHeight: 0.5 }}
              >
                Please message us on{" "}
                <a
                  href="https://www.facebook.com/elyric10"
                  target="_blank"
                  className=" text-blue-600 underline"
                >
                  Facebook
                </a>
              </h2>
              <h2 className="text-sm lato-regular-italic font-bold">
                for question or update request.
              </h2>
            </div>
            <div className="flex flex-col items-center justify-center mt-4">
              <h2 className="montaser-arabic !font-bold">LEGEND:</h2>
              <div className="flex flex-col items-start justify-center gap-1">
                <div className="flex">
                  <div
                    className="flex items-center justify-center gap-2 text-sm lato-regular-italic font-bold"
                    style={{ lineHeight: 0.5 }}
                  >
                    <div className="w-7 h-7 flex items-center justify-center bg-green-500 shadow-[2px_2px_4px_-1px_rgba(0,0,0,0.4)] rounded-full cursor-default">
                      <FaSmile className="text-green-200" size={28} />
                    </div>
                    - to{" "}
                    <span className="font-semibold text-green-600">ATTEND</span>
                  </div>
                </div>

                <div className="flex">
                  <div
                    className="flex items-center justify-center gap-2 text-sm lato-regular-italic font-bold"
                    style={{ lineHeight: 0.5 }}
                  >
                    <div className="w-7 h-7 flex items-center justify-center bg-red-500 shadow-[2px_2px_4px_-1px_rgba(0,0,0,0.4)] rounded-full cursor-default">
                      <FaFrown className="text-red-200" size={28} />
                    </div>{" "}
                    - to{" "}
                    <span className="font-semibold text-red-600">
                      NOT ATTEND
                    </span>
                  </div>
                </div>
              </div>
            </div>
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
