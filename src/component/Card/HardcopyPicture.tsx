import coupleBGImage from "../../assets/rsvp/what_to_wear/elyric_sandy.jpg";

export const HardcopyPicture = () => {
  return (
    <div className="w-[170px] h-[120px] flex flex-col items-center justify-center bg-gradient-to-tr from-white to-gray-50 p-2 shadow-[2px_2px_7px_0px_rgba(0,0,0,0.30)] rounded">
      <div className="ralative w-full h-full bg-red-200 overflow-hidden">
        <img
          src={coupleBGImage}
          alt="Hard copy picture"
          width={"100%"}
          height={"70%"}
          className="object-cover object-bottom"
        />
      </div>
    </div>
  );
};
