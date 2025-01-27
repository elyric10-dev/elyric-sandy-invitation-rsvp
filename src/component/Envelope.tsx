import top_sealed from "../assets/top_envelope_sealed.png";
import bottom_sealed from "../assets/bottom_envelope_sealed.png";
import top_envelope_paper from "../assets/top_envelope_paper.png";
import { Image } from "antd";
import { useState } from "react";

export const Envelope = ({ onOpen }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
    onOpen?.();

    const envelopeElement = document.querySelector(".envelope");
    //display none
    setTimeout(() => {
      envelopeElement?.classList.add("hidden");
    }, 2000);
  };
  return (
    <div className="envelope fixed w-screen h-screen flex items-center justify-center z-50 overflow-hidden">
      {/* TOP ENVELOPE */}
      <div
        className={`flex items-end w-full h-1/2 absolute top-0 left-0 right-0 transition-transform duration-1000 ${
          isOpen ? "transform -translate-y-full" : ""
        }`}
      >
        {/* top envelope paper background on top envelope */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={top_envelope_paper}
            alt="top_envelope_paper"
            className="w-full h-full object-fit"
          />
        </div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">
          <h1 className="text-5xl text-center groom-bride-name">
            Hello there, <br />
            you're invited
          </h1>
        </div>

        {/* ENVELOPE SEALED */}
        <div className="w-full h-full flex items-end justify-center">
          <div
            className="relative flex items-end w-40 z-10"
            onClick={handleClick}
          >
            <div className="flex-1 flex items-end">
              <Image
                preview={false}
                src={top_sealed}
                alt="top_envelope_sealed"
              />
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM ENVELOPE */}
      <div
        className={`flex justify-center w-full h-1/2 absolute bottom-0 left-0 right-0 transition-transform duration-1000 ${
          isOpen ? "transform translate-y-full" : ""
        }`}
      >
        {/* bottom envelope paper background on top envelope */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={top_envelope_paper}
            alt="top_envelope_paper"
            className="w-full h-full object-fit rotate-180"
          />
        </div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">
          <h1 className="text-5xl text-center groom-bride-name">
            Please click the sealed to open
          </h1>
        </div>
        <div
          className="relative flex items-start w-40 z-10"
          onClick={handleClick}
        >
          <div className="flex-1 flex items-start">
            <Image
              preview={false}
              src={bottom_sealed}
              alt="bottom_envelope_sealed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
