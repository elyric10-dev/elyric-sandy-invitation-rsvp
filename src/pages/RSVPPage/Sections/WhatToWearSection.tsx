import { Image } from "antd";
import coupleBGImage from "../../../assets/rsvp/what_to_wear/elyric_sandy.jpg";
import whatToWearBG from "../../../assets/rsvp/what_to_wear/what_wear_bg.png";
import { HardcopyPicture } from "../../../component/Card/HardcopyPicture";
export const WhatToWearSection = () => {
  const darkerLilac = "#7b629a";
  const lilac = "#c8a2c8";

  const colorCodes = [
    {
      colorCode: "#ffe4c4",
      colorName: "Pink",
    },
    {
      colorCode: "#ffe1cb",
      colorName: "Purple",
    },
    {
      colorCode: "#edc9f9",
      colorName: "Blue",
    },
    {
      colorCode: "#e5bcdd",
      colorName: "Green",
    },
  ];
  return (
    <div className="relative w-full min-w-xs max-w-lg flex flex-col rounded-b-lg">
      <div className="relative w-full h-full">
        <Image
          src={coupleBGImage}
          alt="What to wear"
          preview={false}
          width="100%"
          height="100%"
          className="object-cover"
        />
        <div className="w-full h-3/4 absolute bottom-0 bg-gradient-to-t from-white via-white/70 to-transparent"></div>
      </div>
      <div className="relative w-full bg-white">
        <Image
          src={whatToWearBG}
          alt="What to wear"
          preview={false}
          width="100%"
          height="100%"
          className="object-cover opacity-20"
        />
      </div>

      {/* CONTENT */}

      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start">
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          <div className="w-full">
            <h1
              className={`font-tallowSansTC flex flex-col items-center text-3xl scale-y-[1.35] py-3 drop-shadow-md`}
              style={{ color: darkerLilac }}
            >
              WHAT TO WEAR
            </h1>

            <span
              className="grid place-items-center montaser-arabic py-1 text-lg font-bold"
              style={{ color: darkerLilac }}
            >
              DRESS CODE AND COLORS
            </span>

            <span
              className="grid place-items-center montaser-arabic py-1 text-lg font-semibold"
              style={{ color: lilac }}
            >
              <i>
                <p>SEMI-FORMAL</p>
              </i>
            </span>
            {/* DRESS CODES */}
            <div className="flex w-full h-28 items-center justify-evenly">
              {colorCodes.map((colorCode, index) => {
                return (
                  <div
                    className="w-16 h-16 rounded-full border-2 border-[#505050]"
                    key={index}
                    style={{ backgroundColor: colorCode.colorCode }}
                  ></div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* HARD COPY PICTURE */}
      <div className="relative w-full flex flex-col items-center justify-center bg-red-300">
        <div className="absolute bottom-36 picture1-animation">
          <HardcopyPicture />
        </div>
        <div className="absolute bottom-36 picture2-animation">
          <HardcopyPicture />
        </div>
        <div className="absolute bottom-32 picture3-animation">
          <HardcopyPicture />
        </div>
        <div className="absolute z-[4] -rotate-[6deg] scale-[1.4] bottom-32 translate-x-1/2 translate-y-3/4 transition-transform duration-300 hover:rotate-0 hover:translate-x-0 hover:-translate-y-0 hover:scale-[2.6] hover:z-10">
          <HardcopyPicture />
        </div>
      </div>
    </div>
  );
};
