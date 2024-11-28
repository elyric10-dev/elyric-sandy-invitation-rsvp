import { QRCode, Divider, List } from "antd";
import {
  SafetyCertificateOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import ringImage from "../assets/ring.png";

const WeddingGatePass = ({
  guestName,
  invitationCode,
  eventDate,
  venue,
  numberOfGuests = 1,
  partyMembers,
}: any) => {
  // Create a structured data string for the QR code
  const colorLilac = "#C8A2C8";
  const qrData = JSON.stringify({
    code: invitationCode,
    name: guestName,
    guests: numberOfGuests,
    type: "WEDDING_GATE_PASS",
  });

  console.log("partyMembers", partyMembers);

  return (
    <div className="w-full max-w-96 bg-[#f3ffe4] rounded-xl shadow-lg overflow-hidden">
      {/* Header Section */}
      <div className={`bg-gradient-to-t from-[#eec0ee] to-[{colorLilac}] p-4`}>
        <h2 className="text-center text-2xl font-serif text-gray-800">
          Official Event Pass
        </h2>
        <p className="text-center text-sm text-gray-600 mt-1">
          Wedding Celebration
        </p>
      </div>
      <Divider
        variant="dashed"
        style={{ borderColor: colorLilac, marginTop: "4px" }}
      />
      <h1 className="text-4xl text-[#C8A2C8] text-center font-semi bold">
        <i>SCAN ME TO ENTER</i>
      </h1>

      {/* Guest Information */}
      <div className="p-6">
        {/* QR Code Section */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="absolute inset-0 border-4 border-[#C8A2C8] rounded-2xl -m-2"></div>
            <QRCode
              value={qrData}
              size={200}
              //   icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              //   icon={ringImage}
              iconSize={100}
              bordered={false}
              color="#374151"
              style={{
                margin: ".3rem",
              }}
            />
          </div>
        </div>

        <div className="text-center mb-4">
          {partyMembers.map((member: any, index: any) => (
            <>
              <div
                key={index}
                className="flex gap-1 items-center justify-center text-gray-800"
              >
                <h2 className="font-medium text-2xl">{member.name}</h2>
                {member.middleName && (
                  <h2 className="font-medium text-2xl">{member.middle}</h2>
                )}
                <h2 className="font-medium text-2xl">{member.lastname}</h2>
              </div>

              <Divider className="p-0 my-1" />
            </>
          ))}
          <div className="flex gap-1 items-center justify-center text-gray-600">
            <p className="text-sm text-gray-500">Number of Seats:</p>
            <h2 className="font-bold text-xl text-gray-700">
              {numberOfGuests}
            </h2>
          </div>
        </div>

        {/* Event Details */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center justify-center text-gray-600">
            <CalendarOutlined className="mr-2" />
            <span>{eventDate}</span>
          </div>
          <div className="flex items-center justify-center text-gray-600">
            <EnvironmentOutlined className="mr-2" />
            <span>{venue}</span>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center space-y-2">
          <p className="font-medium text-gray-700">
            Please present this QR code at the entrance
          </p>
          <p className="text-sm text-gray-500">
            Gate Pass ID: {invitationCode}
          </p>
        </div>
      </div>

      <Divider
        variant="dashed"
        style={{ borderColor: colorLilac, margin: 0 }}
      />
      <div className="text-xs text-start text-gray-500 space-y-1 p-6">
        <p>⚠️ This pass is required for entry</p>
        <p>⚠️ Not transferable</p>
        <p>⚠️ Valid only for the number of seats specified</p>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 p-4">
        <p className="text-center text-xs text-gray-500">
          For assistance, please contact the wedding coordinator
        </p>
      </div>
    </div>
  );
};

export default WeddingGatePass;
