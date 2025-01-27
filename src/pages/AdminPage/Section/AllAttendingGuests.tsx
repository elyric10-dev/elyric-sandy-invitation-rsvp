import { useEffect, useState } from "react";
import { Button, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { api } from "../../../services/api";
import { addGuestToTable } from "../../../services/TableService";

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
];

export const AllAttendingGuests = ({
  guestData,
  tableId,
  onClose,
}: {
  guestData: GuestDataType[];
  tableId: number;
  onClose: (data: any) => void;
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSelectedRowKeys([]);
  }, []);

  const onSelectChange = (newSelectedRowKeys: any[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    table_id: tableId,
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleAssign = async () => {
    setIsLoading(true);
    const dataToPass = {
      table_id: tableId,
      attending_guest_ids: selectedRowKeys,
    };
    try {
      const response = await addGuestToTable(dataToPass);
      onClose(response.table_members);
      setIsLoading(false);
    } catch (error) {
      console.error("Error assigning table:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-3xl font-semibold">All Attending Guests</h1>
      <Table<GuestDataType>
        rowSelection={rowSelection}
        columns={columns}
        dataSource={guestData}
      />
      <Button
        onClick={handleAssign}
        disabled={
          isLoading || selectedRowKeys.length === 0 || selectedRowKeys === null
        }
        type="primary"
        className="bg-blue-500"
      >
        Assign Table
      </Button>
    </div>
  );
};
