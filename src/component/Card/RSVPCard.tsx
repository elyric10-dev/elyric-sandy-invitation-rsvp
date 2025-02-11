import { Image, Modal, Tooltip } from "antd";
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
import { getServerDate } from "../../services/GlobalSettings";

interface IWeddingInvitationCardProps {
  invitationCode: string;
  headerLogoUrl?: any;
}

export const RSVPCard = ({
  invitationCode,
  headerLogoUrl,
}: IWeddingInvitationCardProps) => {
  const [invitationData, setInvitationData] = useState<any>([]);
  const [kidsList, setKidsList] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [seatCount, setSeatCount] = useState(0);
  const [isDeadline, setIsDeadline] = useState(false);

  const lighterBlack = "#4e4449";
  const darkerLilac = "#7b629a";
  const lilac = "#c8a2c8";
  const gold = "#d4bc68";
  const beige = "#f5f5dc";
  const deadlineDay = 10;

  useEffect(() => {
    const fetchInvitationData = async () => {
      try {
        const dateResponse = await getServerDate();
        const serverDate = new Date(dateResponse.server_date);
        const onOrBeforeDate = new Date(
          serverDate.getFullYear(),
          1,
          deadlineDay + 1
        ); // Last is February 10 so, will be disabled once February 11

        if (serverDate > onOrBeforeDate) {
          setIsDeadline(true);
        } else {
          setIsDeadline(false);
        }

        const response = await getInvitationData(invitationCode);
        setInvitationData(response.invitation.guests);
        setKidsList(response.invitation.kids);
        setSeatCount(response.invitation.seat_count);
      } catch (error) {
        console.error("Error fetching invitation data:", error);
      }
    };
    fetchInvitationData();
  }, [invitationCode]);

  const handleIsAttendingClick = (
    id: number,
    isAttending: boolean,
    isKid: boolean
  ) => {
    const guest = invitationData.find((guest: any) => guest.id === id);
    const kid = kidsList.find((kid: any) => kid.id === id);

    if (isKid) {
      if (kid) kid.is_attending = isAttending;
      else console.error("Kid not found with id:", id);
    } else {
      if (guest) guest.is_attending = isAttending;
      else console.error("Guest not found with id:", id);
    }

    setInvitationData([...invitationData]);
    setKidsList([...kidsList]);
  };

  const handleResetIsAttending = (id: number, isKid: boolean) => {
    const guest = invitationData.find((guest: any) => guest.id === id);
    const kid = kidsList.find((kid: any) => kid.id === id);
    if (isKid) {
      if (kid) kid.is_attending = null;
      else console.error("Kid not found with id:", id);
    } else {
      if (guest) guest.is_attending = null;
      else console.error("Guest not found with id:", id);
    }

    setInvitationData([...invitationData]);
    setKidsList([...kidsList]);
  };

  const handleSubmitRSVP = async () => {
    setIsLoading(true);

    const hasKidAttending = kidsList.some((kid: any) => kid.is_attending);
    const hasGuestAttending = invitationData.some(
      (guest: any) => guest.is_attending
    );

    if (hasKidAttending && !hasGuestAttending) {
      return Modal.warning({
        content: "Kids must be accompanied by their guardians.",
        style: {
          top: "50%",
          transform: "translateY(-50%)",
        },
        onOk() {
          setIsLoading(false);
        },
      });
    }

    try {
      const data = {
        party_members: invitationData,
        kids_list: kidsList,
      };
      const response = await updateInvitationData(invitationCode, data);

      console.log("RSVP response: ", response);

      const updatedGuests = response.invitation.guests;
      setInvitationData(updatedGuests);

      const hasAttendingGuest = invitationData.some(
        (guest: any) => guest.is_attending
      );

      if (hasAttendingGuest) {
        Modal.success({
          content:
            "Submitted! Thank you for your response! Please keep your QR Pass Code 🤗",
          style: {
            top: "50%",
            transform: "translateY(-50%)",
          },
          onOk() {
            setIsLoading(false);
            window.open(
              `https://elyric-sandy.elyricm.cloud/pass/${invitationCode}`,
              "_blank"
            );
          },
        });
      } else {
        Modal.warning({
          content:
            "Response submitted! We are sorry to hear that you can't attend. I hope you will change your mind before February 10, 2025. Thank you! 🥺",
          style: {
            top: "50%",
            transform: "translateY(-50%)",
          },
        });
      }
    } catch (error) {
      console.error("Error updating invitation data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full min-w-xs max-w-lg overflow-hidden rounded-b-lg shadow-lg">
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
                {seatCount}
              </span>
              <span className="text-sm font-medium">
                {seatCount > 1 ? "SEATS" : "SEAT"} IN YOUR HONOR.
              </span>
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
              KINDLY CONFIRM YOUR ATTENDANCE ON OR BEFORE
            </h2>
            <h2
              className="text-xl lato-regular-italic font-semibold cursor-default relative z-10"
              style={{ color: darkerLilac }}
            >
              FEBRUARY 10, 2025
            </h2>
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center gap-8">
          <h2
            className="montaser-arabic !font-semibold text-2xl"
            style={{ color: lighterBlack }}
          >
            GUEST {seatCount > 1 ? "NAMES" : "NAME"}
          </h2>
          <div className="w-full flex flex-col items-center gap-2">
            {invitationData.map((guest: any) => (
              <div key={guest.id} className="w-full h-full">
                <div
                  className="flex items-end justify-between gap-4 border-b-2 mx-12"
                  style={{ borderColor: gold }}
                >
                  <h3
                    className="courgette text-2xl pb-2"
                    style={{ color: darkerLilac, lineHeight: "1.3rem" }}
                  >
                    {guest.name} {guest.middle} {guest.lastname}
                  </h3>

                  {guest.is_attending === null && (
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <div
                        className="w-10 h-10 flex items-center justify-center bg-green-500 shadow-[2px_2px_4px_-1px_rgba(0,0,0,0.4)] rounded-full cursor-pointer transition duration-100 active:scale-110"
                        onClick={() =>
                          handleIsAttendingClick(guest.id, true, false)
                        }
                      >
                        <FaSmile className="text-green-200" size={32} />
                      </div>
                      <div
                        className="w-10 h-10 flex items-center justify-center bg-red-500 shadow-[2px_2px_4px_-1px_rgba(0,0,0,0.4)] rounded-full cursor-pointer transition duration-100 active:scale-110"
                        onClick={() =>
                          handleIsAttendingClick(guest.id, false, false)
                        }
                      >
                        <FaFrown className="text-red-200" size={32} />
                      </div>
                    </div>
                  )}

                  {guest.is_attending !== null && (
                    <div className="flex items-end justify-right gap-2 mb-1 ">
                      {guest.is_attending ? (
                        <h1 className="text-green-600">Attending</h1>
                      ) : (
                        <div className="flex flex-col items-center leading-[14px]">
                          <h1 className="text-red-600">Can't</h1>
                          <h1 className="text-red-600">Attend</h1>
                        </div>
                      )}
                      {!isDeadline && (
                        <div
                          className="w-8 h-8 flex items-center justify-center shadow-[2px_2px_4px_-1px_rgba(0,0,0,0.4)] rounded-full cursor-pointer transition duration-100 active:scale-110"
                          style={{ backgroundColor: beige }}
                          onClick={() =>
                            handleResetIsAttending(guest.id, false)
                          }
                        >
                          <FaArrowRotateLeft
                            className="text-blue-500"
                            size={20}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* KIDS LIST */}
          {kidsList && kidsList.length > 0 && (
            <>
              <h2
                className="montaser-arabic !font-semibold text-2xl"
                style={{ color: lighterBlack }}
              >
                {seatCount > 1 ? "KIDS LIST" : "KID LIST"}
              </h2>
              <div className="w-full flex flex-col items-center gap-2">
                {kidsList.map((kid: any) => (
                  <div key={kid.id} className="w-full h-full">
                    <div
                      className="flex items-end justify-between gap-4 border-b-2 mx-12"
                      style={{ borderColor: gold }}
                    >
                      <h3
                        className="courgette text-2xl pb-2"
                        style={{ color: darkerLilac, lineHeight: "1.3rem" }}
                      >
                        {kid.name} {kid.middle} {kid.lastname}
                      </h3>

                      {kid.is_attending === null && (
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <div
                            className="w-10 h-10 flex items-center justify-center bg-green-500 shadow-[2px_2px_4px_-1px_rgba(0,0,0,0.4)] rounded-full cursor-pointer transition duration-100 active:scale-110"
                            onClick={() =>
                              handleIsAttendingClick(kid.id, true, true)
                            }
                          >
                            <FaSmile className="text-green-200" size={32} />
                          </div>
                          <div
                            className="w-10 h-10 flex items-center justify-center bg-red-500 shadow-[2px_2px_4px_-1px_rgba(0,0,0,0.4)] rounded-full cursor-pointer transition duration-100 active:scale-110"
                            onClick={() =>
                              handleIsAttendingClick(kid.id, false, true)
                            }
                          >
                            <FaFrown className="text-red-200" size={32} />
                          </div>
                        </div>
                      )}

                      {kid.is_attending !== null && (
                        <div className="flex items-end justify-right gap-2 mb-1">
                          {kid.is_attending ? (
                            <h1 className="text-green-600">Attending</h1>
                          ) : (
                            <div className="flex flex-col items-center leading-[14px]">
                              <h1 className="text-red-600">Can't</h1>
                              <h1 className="text-red-600">Attend</h1>
                            </div>
                          )}

                          <div
                            className="w-8 h-8 flex items-center justify-center shadow-[2px_2px_4px_-1px_rgba(0,0,0,0.4)] rounded-full cursor-pointer transition duration-100 active:scale-110"
                            style={{ backgroundColor: beige }}
                            onClick={() => handleResetIsAttending(kid.id, true)}
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
            </>
          )}

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
                    {" - "}
                    <span className="font-semibold text-green-600">
                      Attending
                    </span>
                  </div>
                </div>

                <div className="flex">
                  <div
                    className="flex items-center justify-center gap-2 text-sm lato-regular-italic font-bold"
                    style={{ lineHeight: 0.5 }}
                  >
                    <div className="w-7 h-7 flex items-center justify-center bg-red-500 shadow-[2px_2px_4px_-1px_rgba(0,0,0,0.4)] rounded-full cursor-default">
                      <FaFrown className="text-red-200" size={28} />
                    </div>
                    {" - "}
                    <span className="font-semibold text-red-600">
                      Not Attending
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isDeadline ? (
            <Tooltip title="RSVP Deadline: February 10, 2025">
              <span>
                {" "}
                {/* Tooltip requires a wrapper span for disabled buttons */}
                <button
                  className="bg-[#f5f5dc] text-[#7b629a] montaser-arabic !font-semibold mt-8 py-2 px-8 rounded shadow-[2px_2px_4px_-1px_rgba(0,0,0,0.4)] hover:shadow-[2px_2px_5px_-3px_rgba(0,0,0,0.4)] transition duration-100 active:scale-110 disabled:text-gray-300 disabled:scale-100 disabled:cursor-not-allowed disabled:shadow-[2px_2px_4px_-1px_rgba(0,0,0,0.4)] disabled:bg-gray-300"
                  onClick={handleSubmitRSVP}
                  disabled={
                    isLoading ||
                    invitationData.some(
                      (guest: any) => guest.is_attending === null
                    ) ||
                    kidsList.some((kid: any) => kid.is_attending === null) ||
                    isDeadline
                  }
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-900"></div>
                    </div>
                  ) : (
                    <span
                      style={{
                        color: invitationData.some(
                          (guest: any) => guest.is_attending === null
                        )
                          ? "#aaaaaa"
                          : darkerLilac,
                      }}
                    >
                      Submit RSVP
                    </span>
                  )}
                </button>
              </span>
            </Tooltip>
          ) : (
            <button
              className="bg-[#f5f5dc] text-[#7b629a] montaser-arabic !font-semibold mt-8 py-2 px-8 rounded shadow-[2px_2px_4px_-1px_rgba(0,0,0,0.4)] hover:shadow-[2px_2px_5px_-3px_rgba(0,0,0,0.4)] transition duration-100 active:scale-110 disabled:text-gray-300 disabled:scale-100 disabled:cursor-not-allowed disabled:shadow-[2px_2px_4px_-1px_rgba(0,0,0,0.4)] disabled:bg-gray-300"
              onClick={handleSubmitRSVP}
              disabled={
                isLoading ||
                invitationData.some(
                  (guest: any) => guest.is_attending === null
                ) ||
                kidsList.some((kid: any) => kid.is_attending === null) ||
                isDeadline
              }
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-900"></div>
                </div>
              ) : (
                <span
                  style={{
                    color: invitationData.some(
                      (guest: any) => guest.is_attending === null
                    )
                      ? "#aaaaaa"
                      : darkerLilac,
                  }}
                >
                  Submit RSVP
                </span>
              )}
            </button>
          )}
        </div>

        <div className="relative mb-32 rounded overflow-hidden"></div>
      </div>
    </div>
  );
};
