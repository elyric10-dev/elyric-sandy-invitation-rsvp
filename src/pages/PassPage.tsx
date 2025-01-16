import { GatePass } from "./GatesPass/GatePass";
import lilac_beige_orbs_bg from "../../src/assets/rsvp/lilac_beige_orbs_bg.jpg";

export const PassPage = () => {
  return (
    <div className="flex justify-center items-center gap-12 w-full max-w-4xl mx-auto">
      <div className="fixed inset-0 -z-10 opacity-20">
        <img
          src={lilac_beige_orbs_bg}
          alt="background"
          className="w-screen h-screen object-cover blur-sm"
        />
      </div>
      <GatePass />
    </div>
  );
};
