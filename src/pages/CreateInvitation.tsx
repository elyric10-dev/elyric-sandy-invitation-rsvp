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
  partyName: string;
  partyMiddle: string | null;
  partyLastname: string;
}

interface ICreateInvitationValues {
  name: string;
  middle: string | null;
  lastname: string;
  seatCount: number;
  is_attending: boolean;
  party_members: IPartyMembers;
}

const CreateInvitation = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [invitationLink, setInvitationLink] = useState("");
  const [partyMembers, setPartyMembers] = useState<any>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const seatCount = form.getFieldValue("seatCount");
    setIsButtonDisabled(
      partyMembers.length !== seatCount || partyMembers.length === 0
    );
  }, [partyMembers, form]);

  const handleEdit = (index: number) => {
    // Set the input fields with the selected member's data
    form.setFieldsValue({
      partyName: partyMembers[index].partyName,
      partyMiddle: partyMembers[index].partyMiddle,
      partyLastname: partyMembers[index].partyLastname,
    });

    // Remove the item from the list
    removePartyMember(index);

    // Optionally scroll to or focus on the input
    // document.querySelector('input[name="partyName"]')?.focus();
  };

  const createInvitation = async (values: ICreateInvitationValues) => {
    try {
      setLoading(true);
      const response = await api.post("/api/invitations", {
        name: values.name,
        middle: values.middle || "",
        lastname: values.lastname,
        seat_count: values.seatCount,
        is_attending: false,
        party_members: partyMembers,
      });

      const link = response.data.invitation.invitation_link;
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

  const addPartyMember = () => {
    const values = form.getFieldsValue([
      "partyName",
      "partyMiddle",
      "partyLastname",
    ]);

    if (!values.partyName || !values.partyLastname) {
      message.error("Please fill in the required fields");
      return;
    }

    const updatedPartyMembers = [...partyMembers, values];

    setPartyMembers(updatedPartyMembers);

    form.setFieldsValue({
      partyName: "",
      partyMiddle: "",
      partyLastname: "",
    });
  };

  const removePartyMember = (index: number) => {
    setPartyMembers(partyMembers.filter((_: any, i: number) => i !== index));
  };

  const handleCreateInvitation = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      const values = await form.validateFields();
      createInvitation(values);
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error("Please fill in all required fields");
      }
    }
  };

  const handleValuesChange = () => {
    const seatCount = form.getFieldValue("seatCount");
    setIsButtonDisabled(
      partyMembers.length !== seatCount || partyMembers.length === 0
    );
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
        className="flex flex-col justify-center items-center lg:flex-row lg:justify-between lg:items-start"
        form={form}
        layout="vertical"
        onFinish={createInvitation}
        onValuesChange={handleValuesChange}
      >
        <Card title="Create New Invitation" className="w-96 mb-8 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="name"
              label="First Name"
              rules={[{ required: true, message: "Please enter first name" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="middle" label="Middle Name">
              <Input />
            </Form.Item>

            <Form.Item
              name="lastname"
              label="Last Name"
              rules={[{ required: true, message: "Please enter last name" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="seatCount"
              label="Number of Seats"
              rules={[
                { required: true, message: "Please enter number of seats" },
              ]}
            >
              <InputNumber min={1} max={10} className="w-full" />
            </Form.Item>
          </div>
        </Card>

        {/* // PARTY LISTS */}

        <Card title="Party Members" className="w-96 mb-8 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Form.Item name="partyName" label="First Name">
              <Input />
            </Form.Item>

            <Form.Item name="partyMiddle" label="Middle Name">
              <Input />
            </Form.Item>

            <Form.Item name="partyLastname" label="Last Name">
              <Input />
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              type="dashed"
              onClick={addPartyMember}
              block
              icon={<PlusOutlined />}
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
                  title={`${member.partyName} ${
                    member.partyMiddle ? member.partyMiddle : ""
                  } ${member.partyLastname}`}
                />
              </List.Item>
            )}
          />

          <Button
            type="primary"
            loading={loading}
            className="mt-4 shadow-md"
            onClick={handleCreateInvitation}
            disabled={isButtonDisabled}
          >
            Create RSVP Invitation
          </Button>

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
