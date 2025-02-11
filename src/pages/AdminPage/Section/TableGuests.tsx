import { Button, Modal, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { useEffect, useState } from "react";
import { AllAttendingGuests } from "./AllAttendingGuests";
import {
  deleteGuestFromTable,
  getAllAttendingGuests,
} from "../../../services/TableService";

export interface GuestDataType {
  id: number;
  key: string;
  name: string;
  middle: string;
  lastname: string;
  status: "arrived" | "waiting" | "not-arrived";
  is_kid: boolean;
}

export const TableGuests = ({
  tableId,
  tableNumber = null,
  guestData,
}: {
  tableId: number;
  tableNumber: number | null;
  guestData: GuestDataType[];
}) => {
  const [isAddTableGuestModalOpen, setIsAddTableGuestModalOpen] =
    useState(false);
  const [allGuestsData, setAllGuestsData] = useState<GuestDataType[]>([]);
  const [guestInTable, setGuestInTable] = useState<GuestDataType[]>([]);

  useEffect(() => {
    setGuestInTable(guestData);
  }, [guestData]);

  const handleAddGuest = async () => {
    try {
      const guestsDataResponse = await getAllAttendingGuests();

      console.log("guestsDataResponse: ", guestsDataResponse);

      // if (guestsDataResponse.kids.length > 0) {
      //   guestsDataResponse.kids.forEach((kid: any) => {
      //     kid.isKid = true;
      //   });
      // }

      setAllGuestsData(guestsDataResponse.attendingGuests);
      // console.log("allGuestsData: ", allGuestsData);
      setIsAddTableGuestModalOpen(true);
    } catch (error) {
      console.error("Error fetching guests data:", error);
    }
    setIsAddTableGuestModalOpen(true);
  };

  const handleDelete = async (guestRow: GuestDataType) => {
    console.log("guestRow: ", guestRow);
    let guestId = guestRow.id;

    try {
      const response = await deleteGuestFromTable({
        id_to_delete: guestId,
        table_id: tableId,
        is_kid: guestRow.is_kid,
      });

      console.log("delete response: ", response);

      setGuestInTable(response.table_members);
    } catch (error) {
      console.error("Error deleting guest from table:", error);
    }
  };

  const handleAddTableGuestOnClose = (data: GuestDataType[]) => {
    setIsAddTableGuestModalOpen(false);
    setGuestInTable(data);
  };

  const columns: TableProps<GuestDataType>["columns"] = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
      render: (_, __, index) => <b>{index + 1}</b>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Middle",
      dataIndex: "middle",
      key: "middle",
    },
    {
      title: "Lastname",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, data) => (
        <Tag
          color={
            data.status === "not-arrived"
              ? "error"
              : data.status === "arrived"
              ? "success"
              : "default"
          }
        >
          {data.status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, data) => (
        <Space size="middle">
          <Button onClick={() => handleDelete(data)} type="primary">
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 p-4">
      <div className="flex items-center gap-20">
        <h1 className="text-3xl font-semibold">Table #{tableNumber} Guests</h1>
        <div
          className="p-1 rounded-full bg-gray-50 border-2 shadow-[2px_2px_5px_2px_rgba(0,0,0,0.1)] hover:shadow-[2px_2px_5px_-2px_rgba(0,0,0,0.2)] scale-100 hover:scale-125 transition duration-300 cursor-pointer"
          onClick={handleAddGuest}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
      </div>
      <Table<GuestDataType>
        rowKey="id"
        columns={columns}
        dataSource={guestInTable}
      />
      <Modal
        open={isAddTableGuestModalOpen}
        onCancel={() => setIsAddTableGuestModalOpen(false)}
        width={720}
        footer={null}
      >
        <AllAttendingGuests
          tableId={tableId}
          guestData={allGuestsData}
          onClose={handleAddTableGuestOnClose}
        />
        {/* <CreateTable onCreated={handleCreateTable} /> */}
      </Modal>
    </div>
  );
};
