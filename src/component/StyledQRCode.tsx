import { QRCode } from "antd";
import { HeartFilled } from "@ant-design/icons";

interface IStyledQRCodeProps {
  invitationUrl: string;
}

const StyledQRCode = ({ invitationUrl }: IStyledQRCodeProps) => {
  const colorLilac = "#C8A2C8";
  return (
    <div className="flex flex-col items-center p-8 max-w-sm mx-auto">
      <div className="relative">
        <div className="absolute inset-0 border-8 border-[#C8A2C8] rounded-lg -m-4 opacity-50"></div>

        <QRCode
          value={invitationUrl}
          size={200}
          //   icon={<HeartFilled style={{ color: "#F472B6" }} />}
          iconSize={40}
          bordered={false}
          color="#1F2937"
          style={{
            background: "white",
            padding: "1rem",
          }}
        />
      </div>

      {/* Decorative elements */}
      <div className="mt-6 text-center">
        <p className="text-gray-600 font-serif italic">Scan to Pass</p>
        <div className="flex items-center justify-center mt-2 space-x-2">
          <div className="h-px w-12 bg-pink-200"></div>
          <HeartFilled className="text-pink-400" />
          <div className="h-px w-12 bg-pink-200"></div>
        </div>
      </div>
    </div>
  );
};

export default StyledQRCode;
