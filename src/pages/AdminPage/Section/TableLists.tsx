import React, { useEffect, useState } from "react";
import { Button, Modal, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { GuestDataType, TableGuests } from "./TableGuests";
import { AllAttendingGuests } from "./AllAttendingGuests";
import CreateTable from "./CreateTable";
import { deleteTable, getTableData } from "../../../services/TableService";

interface TableDataType {
  id?: number;
  key: string;
  table_number: number;
  status: "available" | "reserved" | "occupied";
  capacity: number;
}

const guestData: GuestDataType[] = [
  {
    key: "1",
    name: "Elyric",
    middle: "Abera",
    lastname: "Manatad",
    status: "Not arrive",
  },
  {
    key: "2",
    name: "Sandy",
    middle: "Mayol",
    lastname: "Dupal",
    status: "Arrived",
  },
  {
    key: "3",
    name: "Elysa",
    middle: "Mayol",
    lastname: "Manatad",
    status: "Waiting",
  },
];

export const TableLists = () => {
  const [tableData, setTableData] = useState<TableDataType[]>([]);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [selectedGuestTable, setSelectedGuestTable] =
    useState<TableDataType | null>(null);
  const [isCreateTableModalOpen, setIsCreateTableModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const columns: TableProps<TableDataType>["columns"] = [
    {
      title: "Table no.",
      dataIndex: "no",
      key: "no",
      render: (_, data) => <b>{data.table_number}</b>,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, data) => (
        <Tag
          className="cursor-default"
          color={
            data.status === "occupied"
              ? "error"
              : data.status === "available"
              ? "success"
              : "default"
          }
        >
          {data.status}
        </Tag>
      ),
    },
    {
      title: "Capacity",
      key: "capacity",
      dataIndex: "capacity",
      render: (_, data) => data.capacity,
    },
    {
      title: "Action",
      key: "action",
      render: (_, data) => (
        <Space size="middle">
          <Button
            onClick={async (e) => {
              e.stopPropagation(); // Prevent the click event from propagating to the parent
              try {
                const response = await deleteTable((data as { id: number }).id);
                console.log("Delete table response:", response);
                setTableData(response.tables);
              } catch (error) {
                console.error("Error deleting table:", error);
              }
            }}
            className="z-10"
            type="primary"
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getTableData();
        setTableData(response.tables);
      } catch (error) {
        console.error("Error fetching table data:", error);
      }
    };

    fetchData();
    setIsLoading(false);
  }, []);

  const handleRowClick = (record: TableDataType) => {
    setSelectedGuestTable(record);
    setIsGuestModalOpen(true);

    console.log(record);
  };

  const handleCreateTable = (tableData: any) => {
    setIsCreateTableModalOpen(false);
    setTableData(tableData.tables);
    console.log("Close Create Table Modal", tableData);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 p-4">
      <div className="flex items-center gap-20">
        <h1 className="text-3xl font-bold">Table Lists</h1>
        <div
          className="p-1 rounded-full bg-gray-50 border-2 shadow-[2px_2px_5px_2px_rgba(0,0,0,0.1)] hover:shadow-[2px_2px_5px_-2px_rgba(0,0,0,0.2)] scale-100 hover:scale-125 transition duration-300 cursor-pointer"
          onClick={() => setIsCreateTableModalOpen(true)}
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
      <Table<TableDataType>
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
          style: { cursor: "pointer" },
        })}
        columns={columns}
        dataSource={tableData}
        loading={isLoading}
      />

      <Modal
        open={isGuestModalOpen}
        onCancel={() => setIsGuestModalOpen(false)}
        width={1000}
        footer={null}
      >
        <TableGuests
          tableNumber={selectedGuestTable?.table_number || null}
          guestData={guestData}
        />
      </Modal>
      <Modal
        open={isCreateTableModalOpen}
        onCancel={() => setIsCreateTableModalOpen(false)}
        width={720}
        footer={null}
      >
        {/* <AllAttendingGuests guestData={guestData} /> */}
        <CreateTable onCreated={handleCreateTable} />
      </Modal>
    </div>
  );
};
