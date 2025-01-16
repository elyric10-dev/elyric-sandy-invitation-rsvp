import { Image } from "antd";
import paper_bg_longer from "../../../assets/rsvp/what_to_wear/paper_bg_longer.png";
import elyric_sandy_prenup from "../../../assets/rsvp/what_to_wear/elyric_sandy_prenup.jpg";
import esw2 from "../../../assets/rsvp/what_to_wear/esw2.jpg";
import esw3 from "../../../assets/rsvp/what_to_wear/esw3.jpg";
import esw5 from "../../../assets/rsvp/what_to_wear/esw5.jpg";
import esw6 from "../../../assets/rsvp/what_to_wear/esw6.jpg";
import tape from "../../../assets/rsvp/what_to_wear/tape.png";
import what_to_wear_pallete from "../../../assets/rsvp/what_to_wear/what_wear_pallete.png";
import { HardcopyPicture } from "../../../component/Card/HardcopyPicture";

export const WhatToWearSection = () => {
  const darkerLilac = "#7b629a";
  const lilac = "#c8a2c8";

  return (
    <div className="relative w-full min-w-xs max-w-lg overflow-hidden shadow-lg py-5">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={paper_bg_longer}
          alt="Paper background"
          preview={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top",
          }}
        />
      </div>

      {/* Content Image */}
      <div className="relative flex items-center justify-center">
        <div className="relative w-full h-full flex flex-col items-center justify-start gap-8 mt-8 rounded-lg">
          <div className="absolute -top-6 z-10 -rotate-[20deg]">
            <Image
              src={tape}
              alt="Tape"
              preview={false}
              style={{
                width: "120px",
                height: "50",
                objectFit: "contain",
              }}
            />
          </div>
          <Image
            src={elyric_sandy_prenup}
            alt="What to wear"
            preview={false}
            style={{
              width: "250px",
              height: "380px",
              objectFit: "contain",
            }}
            // className="mt-2 shadow-[6px_18px_15px_-10px_rgba(0,0,0,0.3)]"
            className="p-3 bg-white mt-2 shadow-[6px_18px_15px_-10px_rgba(0,0,0,0.3)] rounded"
          />

          {/* Content text */}
          <div className="w-full flex flex-col">
            <h1
              className={`font-tallowSansTC flex flex-col items-center text-3xl font-semibold scale-y-[1.7] py-3 drop-shadow-sm`}
              style={{
                color: lilac,
                // textShadow: `2px 1px 2px rgba(200,162,200,0.4)`,
              }}
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
          <div className="h-96">
            <div className="rotate-[-20deg] scale-125 translate-x-[-50%]">
              <HardcopyPicture imageUrl={esw2} width={170} height={100} />
            </div>
            <div className="rotate-[20deg] scale-125 translate-x-1/2 -translate-y-[70%]">
              <HardcopyPicture imageUrl={esw3} width={170} height={120} />
            </div>
            <div className="-rotate-[10deg] scale-125 translate-x-3/4 -translate-y-[65%]">
              <HardcopyPicture imageUrl={esw5} width={120} height={170} />
            </div>
            <div className="-rotate-[10deg] scale-150 -translate-x-1/2 -translate-y-[200%]">
              <HardcopyPicture imageUrl={esw6} width={170} height={120} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
