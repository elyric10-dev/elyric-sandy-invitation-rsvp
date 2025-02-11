import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Card,
  List,
  message,
  Checkbox,
} from "antd";
import {
  PlusOutlined,
  HeartFilled,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { api } from "../services/api";

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
  const [seatCount, setSeatCount] = useState(0);
  const [withKids, setWithKids] = useState(false);
  const [kidsList, setKidsList] = useState<any>([]);

  const addPartyMember = (hasKid: boolean) => {
    const values = form.getFieldsValue(["name", "middle", "lastname"]);

    if (!values.name || !values.lastname) {
      message.error("Please fill in the required fields");
      return;
    }

    if (hasKid) {
      const updatedKidsList = [...kidsList, values];
      setKidsList(updatedKidsList);
    } else {
      const updatedPartyMembers = [...partyMembers, values];
      setPartyMembers(updatedPartyMembers);
    }

    form.setFieldsValue({
      name: "",
      middle: "",
      lastname: "",
    });

    setWithKids(false);
  };

  const handleEdit = (index: number, hasKid: boolean) => {
    if (hasKid) {
      setWithKids(true);
      form.setFieldsValue({
        name: kidsList[index].name,
        middle: kidsList[index].middle,
        lastname: kidsList[index].lastname,
      });
      removeKid(index);
    } else {
      setWithKids(false);
      form.setFieldsValue({
        name: partyMembers[index].name,
        middle: partyMembers[index].middle,
        lastname: partyMembers[index].lastname,
      });
      removePartyMember(index);
    }
  };

  const removePartyMember = (index: number) => {
    setPartyMembers(partyMembers.filter((_: any, i: number) => i !== index));
  };

  const removeKid = (index: number) => {
    setKidsList(kidsList.filter((_: any, i: number) => i !== index));
  };

  const handleCreateInvitation = async (e: React.MouseEvent) => {
    e.preventDefault();

    console.log("Kids List: ", kidsList);

    try {
      setLoading(true);
      const response = await api.post("/invitations", {
        seat_count: seatCount,
        party_members: partyMembers,
        kids_list: kidsList,
      });

      console.log("Response: ", response);

      const link = response.data.invitation_link;
      setInvitationLink(link);

      message.success("Invitation created successfully!");
      form.resetFields();
    } catch (error: any) {
      console.log("Error creating invitation: ", error);
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
    const messageToCopy = `We've reserved a seat for you at our WEDDING! Please follow these simple steps to confirm your attendance:

1. Visit your personal RSVP link (provided below)
2. Select your attendance status
3. Click SUBMIT
4. Click OKAY and wait
5. Keep your QR pass code

IMPORTANT: This is your unique invitation link - please do not share it with others.

Please RSVP or confirm your attendance on or before February 10, 2025.
We look forward to hearing from you!

Thank you! 🤗

Your invitation link: https://${invitationLink}`;

    navigator.clipboard
      .writeText(messageToCopy)
      .then(() => message.success("Invitation link copied to clipboard!"))
      .catch(() => message.error("Failed to copy link"));
  };

  const handleSetKids = () => {
    setWithKids(!withKids);
  };

  return (
    <div className="mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-800">Invitation</h2>
      </div>

      <Form
        className="flex flex-col justify-center items-center lg:flex-row lg:items-start lg:gap-4"
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
              <Input
                disabled={
                  (seatCount === partyMembers.length ||
                    seatCount < partyMembers.length) &&
                  !withKids
                }
              />
            </Form.Item>

            <Form.Item name="middle" label="Middle Name">
              <Input
                disabled={
                  (seatCount === partyMembers.length ||
                    seatCount < partyMembers.length) &&
                  !withKids
                }
              />
            </Form.Item>

            <Form.Item name="lastname" label="Last Name">
              <Input
                disabled={
                  (seatCount === partyMembers.length ||
                    seatCount < partyMembers.length) &&
                  !withKids
                }
              />
            </Form.Item>
          </div>

          {/* WITH KIDS CHECKBOX */}

          <div className="flex items-center gap-2">
            <p className="ml-2">Kids?</p>
            <Checkbox checked={withKids} onChange={handleSetKids} />
          </div>

          <Form.Item>
            <Button
              type="dashed"
              onClick={() => addPartyMember(withKids)}
              block
              icon={<PlusOutlined />}
              disabled={
                (seatCount === partyMembers.length ||
                  seatCount < partyMembers.length) &&
                !withKids
              }
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
                    onClick={() => handleEdit(index, false)}
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
                    member.middle ? member.middle : ""
                  } ${member.lastname}`}
                />
              </List.Item>
            )}
          />

          {kidsList.length > 0 && (
            <Card title="Kids List" className="mt-4 bg-gray-200 shadow-md">
              <List
                className="text-left"
                dataSource={kidsList}
                renderItem={(kid: any, index: number) => (
                  <List.Item
                    actions={[
                      <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(index, true)}
                      />,
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => removeKid(index)}
                      />,
                    ]}
                  >
                    <List.Item.Meta
                      title={`${kid.name} ${kid.middle ? kid.middle : ""} ${
                        kid.lastname
                      }`}
                    />
                  </List.Item>
                )}
              />
            </Card>
          )}

          <div className="w-full flex flex-col justify-center">
            <Button
              type="primary"
              loading={loading}
              className="mt-4 shadow-md"
              onClick={handleCreateInvitation}
              disabled={
                seatCount !== partyMembers.length ||
                partyMembers.length === 0 ||
                invitationLink !== ""
              }
            >
              Create RSVP Invitation
            </Button>

            {invitationLink && (
              <Button
                type="primary"
                className="mt-4 shadow-md bg-green-500"
                onClick={() => {
                  setInvitationLink("");
                  form.resetFields();
                  setPartyMembers([]);
                  setSeatCount(0);
                }}
              >
                Create again
              </Button>
            )}
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
