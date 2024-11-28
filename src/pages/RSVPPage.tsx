import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Form, Input, Button, Card, List, message } from "antd";
import { PlusOutlined, HeartFilled, DeleteOutlined } from "@ant-design/icons";

const api = axios.create({
  baseURL: "https://api-rsvp.elyricm.cloud",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const RSVPPage = () => {
  const { invitationCode } = useParams();
  const [form] = Form.useForm();
  const [partyMembers, setPartyMembers] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/invite/${invitationCode}`);
        setPartyMembers(response.data.invitation.party_members);
      } catch (error: any) {
        message.error(error.response.data.error);
        window.location.href = "/error";
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [invitationCode]);

  const submitRSVP = async () => {
    try {
      setLoading(true);
      const response = await api.post(`/api/invite/rsvp/${invitationCode}`, {
        is_attending: true,
        party_members: partyMembers,
      });

      console.log("response", response);
      message.success("RSVP submitted successfully!");
    } catch (error: any) {
      message.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-script text-red-600 mb-2">
          Elyric & Sandy
        </h1>
        <HeartFilled className="text-red-500 text-2xl" />
      </div>

      <div className="flex flex-col items-center justify-center">
        <Card
          title="RSVP (Respond if you please)"
          className="w-80 mb-8 shadow-md"
        >
          <List
            className="mt-4 text-left"
            dataSource={partyMembers}
            renderItem={(member: any) => (
              <List.Item>
                <List.Item.Meta
                  title={`${member.name} ${
                    member.middle ? member.middle : ""
                  } ${member.lastname}`}
                />
              </List.Item>
            )}
          />

          {partyMembers.length > 0 && (
            <Button
              type="primary"
              onClick={submitRSVP}
              loading={loading}
              className="mt-4"
              disabled={true}
            >
              Submit RSVP
            </Button>
          )}
        </Card>
      </div>
    </div>
  );
};

export default RSVPPage;
