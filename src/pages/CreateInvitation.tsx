import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Input, InputNumber, Button, Card, List, message } from "antd";
import {
  PlusOutlined,
  HeartFilled,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

const api = axios.create({
  baseURL: "https://api-rsvp.elyricm.cloud",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

interface IPartyMembers {
  name: string;
  middle: string | null;
  lastname: string;
  is_attending: boolean;
}

interface ICreateInvitationValues {
  seatCount: number;
  party_members: IPartyMembers;
}

const CreateInvitation = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [invitationLink, setInvitationLink] = useState("");
  const [partyMembers, setPartyMembers] = useState<any>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [seatCount, setSeatCount] = useState(0);

  const addPartyMember = () => {
    const values = form.getFieldsValue(["name", "middle", "lastname"]);

    if (!values.name || !values.lastname) {
      message.error("Please fill in the required fields");
      return;
    }
    const updatedPartyMembers = [...partyMembers, values];

    setPartyMembers(updatedPartyMembers);

    if (partyMembers.length === seatCount) {
      console.log("seat count", seatCount);
      setIsButtonDisabled(false);
    }

    form.setFieldsValue({
      name: "",
      middle: "",
      lastname: "",
    });
  };

  const handleEdit = (index: number) => {
    // Set the input fields with the selected member's data
    form.setFieldsValue({
      name: partyMembers[index].name,
      middle: partyMembers[index].middle,
      lastname: partyMembers[index].lastname,
    });

    removePartyMember(index);
  };

  const removePartyMember = (index: number) => {
    setPartyMembers(partyMembers.filter((_: any, i: number) => i !== index));
  };

  const handleCreateInvitation = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await api.post("/api/invitations", {
        seat_count: seatCount,
        party_members: partyMembers,
      });

      const link = response.data.invitation_link;
      setInvitationLink(link);

      message.success("Invitation created successfully!");
      form.resetFields();
    } catch (error: any) {
      message.error(
        error.response?.data?.error || "Failed to create invitation"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSetCount = () => {
    const updatedSeatCount = form.getFieldValue("seatCount");
    setSeatCount(updatedSeatCount);
  };

  const copyInvitationLink = () => {
    navigator.clipboard
      .writeText(invitationLink)
      .then(() => message.success("Invitation link copied to clipboard!"))
      .catch(() => message.error("Failed to copy link"));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-script text-red-600 mb-2">
          Elyric & Sandy
        </h1>
        <HeartFilled className="text-red-500 text-2xl" />
      </div>

      <Form
        className="flex flex-col justify-center items-center"
        form={form}
        layout="vertical"
      >
        {/* // CREATE NEW INVITATION */}
        <Card title="Create New Invitation" className="w-96 mb-4 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 xs:gap-0 md:gap-4">
            <Form.Item
              name="seatCount"
              label="Number of Seats"
              rules={[
                { required: true, message: "Please enter number of seats" },
              ]}
            >
              <InputNumber onChange={handleSetCount} className="w-full" />
            </Form.Item>
          </div>
        </Card>

        {/* // PARTY LISTS */}

        <Card title="Party Members" className="w-96 mb-8 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 xs:gap-0 md:gap-4">
            <Form.Item name="name" label="First Name">
              <Input disabled={seatCount === partyMembers.length} />
            </Form.Item>

            <Form.Item name="middle" label="Middle Name">
              <Input disabled={seatCount === partyMembers.length} />
            </Form.Item>

            <Form.Item name="lastname" label="Last Name">
              <Input disabled={seatCount === partyMembers.length} />
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              type="dashed"
              onClick={addPartyMember}
              block
              icon={<PlusOutlined />}
              disabled={seatCount === partyMembers.length}
            >
              Add Party Member
            </Button>
          </Form.Item>

          <List
            className="mt-4 text-left"
            dataSource={partyMembers}
            renderItem={(member: any, index: number) => (
              <List.Item
                actions={[
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(index)}
                  />,
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => removePartyMember(index)}
                  />,
                ]}
              >
                <List.Item.Meta
                  title={`${member.name} ${
                    member.partyMiddle ? member.middle : ""
                  } ${member.lastname}`}
                />
              </List.Item>
            )}
          />

          <div className="w-full flex justify-center">
            <Button
              type="primary"
              loading={loading}
              className="mt-4 shadow-md"
              onClick={handleCreateInvitation}
              disabled={seatCount !== partyMembers.length}
            >
              Create RSVP Invitation
            </Button>
          </div>

          {invitationLink && (
            <Card className="mt-8 shadow-md">
              <div className="flex flex-col gap-4">
                <div className="break-all">
                  <p className="font-bold">Invitation Link:</p>
                  <p>{invitationLink}</p>
                </div>
                <Button
                  type="dashed"
                  className="bg-purple-400 text-[#F5F5DC]"
                  onClick={copyInvitationLink}
                >
                  Copy Invitation Link
                </Button>
              </div>
            </Card>
          )}
        </Card>
      </Form>
    </div>
  );
};

export default CreateInvitation;
