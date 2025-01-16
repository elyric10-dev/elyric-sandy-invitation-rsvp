import { Image } from "antd";

interface IHardcopyPictureProps {
  width?: number;
  height?: number;
  imageUrl: string;
}
export const HardcopyPicture = ({
  width,
  height,
  imageUrl,
}: IHardcopyPictureProps) => {
  return (
    <div
      className="flex flex-col items-center justify-center bg-gradient-to-tr from-white to-gray-50 p-2 shadow-[2px_2px_7px_0px_rgba(0,0,0,0.30)] rounded"
      style={{
        width: width,
        height: height,
      }}
    >
      <div className="ralative w-full h-full overflow-hidden">
        <Image
          src={imageUrl}
          alt="Hard copy picture"
          width={"100%"}
          height={"100%"}
          className="object-cover object-bottom"
        />
      </div>
    </div>
  );
};
