import { Result, Button, Typography } from "antd";
import { HeartFilled } from "@ant-design/icons";
import customImage from "../assets/civit4d.jpg";

const ErrorPage = () => {
  const handleBackHome = () => {
    // Redirect to the homepage or an RSVP input page
    window.location.href = "/";
  };

  const CustomIcon = () => (
    <img
      src={customImage}
      alt="Error"
      style={{ width: "300px", height: "200px" }}
    />
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-script text-red-600 mb-2">
          Elyric & Sandy
        </h1>
        <HeartFilled className="text-red-500 text-2xl" />
      </div>

      {/* <div className="flex flex-col justify-center items-center w-full bg-red-400">
        <div className="text-center mb-6">
          <img
            src={customImage}
            alt="Custom Icon"
            style={{ width: 150, height: 150, marginBottom: "1rem" }}
          />
        </div>
        
        <Typography.Title level={2} className="text-white">
          Invite-Only Event
        </Typography.Title>
        <Typography.Text className="text-white">
          This event is invite-only, and your invitation code isn’t on the guest
          list. But hey, no hard feelings! 😁
        </Typography.Text>
      </div> */}

      <Result
        icon={<CustomIcon />}
        status="403"
        title="Invite-Only Event"
        subTitle="This event is invite-only, and your invitation code isn’t on the guest list. But hey, no hard feelings! 😁 But if you have an invitation url please check if you have submitted your response as 'Attending'."
        extra={
          <Button type="primary" onClick={handleBackHome}>
            Back to Home
          </Button>
        }
      />
    </div>
  );
};

export default ErrorPage;
