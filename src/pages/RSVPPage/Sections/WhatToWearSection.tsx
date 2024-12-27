import { Image } from "antd";
import coupleBGImage from "../../../assets/rsvp/what_to_wear/elyric_sandy.jpg";
import whatToWearBG from "../../../assets/rsvp/what_to_wear/what_wear_bg.png";
import { HardcopyPicture } from "../../../component/Card/HardcopyPicture";
import paper_bg from "../../../assets/rsvp/what_to_wear/paper_bg.png";
import paper_bg_longer from "../../../assets/rsvp/what_to_wear/paper_bg_longer.png";
import elyric_sandy_with_tape from "../../../assets/rsvp/what_to_wear/elyric_sandy_with_tape.png";
import what_to_wear_pallete from "../../../assets/rsvp/what_to_wear/what_wear_pallete.png";

export const WhatToWearSection = () => {
  const darkerLilac = "#7b629a";
  const lilac = "#c8a2c8";

  return (
    <div className="relative w-full min-w-xs max-w-lg overflow-hidden rounded-lg shadow-lg py-5">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={paper_bg_longer}
          alt="Paper background"
          preview={false}
          style={{
            width: "100%",
            height: "100%", // Set a large fixed height
            objectFit: "cover",
            objectPosition: "top",
          }}
        />
      </div>

      {/* Content Image */}
      <div className="relative flex items-center justify-center">
        <div className="relative w-full h-full flex flex-col items-center justify-start gap-8 rounded-lg">
          <Image
            src={elyric_sandy_with_tape}
            alt="What to wear"
            preview={false}
            style={{
              width: "250px",
              height: "250px",
              objectFit: "contain",
            }}
            className="mt-2 shadow-[6px_18px_15px_-10px_rgba(0,0,0,0.3)]"
          />

          {/* Content text */}
          <div className="w-full flex flex-col">
            <h1
              className={`font-tallowSansTC flex flex-col items-center text-3xl font-semibold scale-y-[1.7] py-3 drop-shadow-sm`}
              style={{ color: darkerLilac }}
            >
              WHAT TO WEAR
            </h1>

            <span
              className="grid place-items-center montaser-arabic text-lg font-bold"
              style={{ color: darkerLilac }}
            >
              DRESS CODE AND COLORS
            </span>

            <span
              className="grid place-items-center montaser-arabic py-1 text-lg font-bold"
              style={{ color: darkerLilac }}
            >
              <i className="flex flex-col items-center justify-center leading-5">
                <p>SEMI-FORMAL</p>
                <p>(Beige and Lilac Motif)</p>
              </i>
            </span>
          </div>

          {/* DRESS CODES */}
          <div className="w-full flex justify-center items-center">
            <Image
              src={what_to_wear_pallete}
              alt="What to wear"
              preview={false}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>

          <div>
            <p className="w-80 text-center courgette-regular">
              “Feel comfortable and elegant while blending with our soft and
              romantic motif as you join us in celebrating our special day.”
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
