import React from "react";
import { Button, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";

export interface GuestDataType {
  key: string;
  name: string;
  middle: string;
  lastname: string;
  status: "Arrived" | "Waiting" | "Not arrive";
}

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
          data.status === "Not arrive"
            ? "error"
            : data.status === "Arrived"
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
    render: (_, __) => (
      <Space size="middle">
        <Button type="primary">Delete</Button>
      </Space>
    ),
  },
];

export const TableGuests = ({
  tableNumber = null,
  guestData,
}: {
  tableNumber: number | null;
  guestData: GuestDataType[];
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-3xl font-semibold">Table #{tableNumber} Guests</h1>
      <Table<GuestDataType> columns={columns} dataSource={guestData} />
    </div>
  );
};
