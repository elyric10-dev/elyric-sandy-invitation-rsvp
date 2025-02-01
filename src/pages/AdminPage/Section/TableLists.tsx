import React, { useEffect, useState } from "react";
import { Button, Modal, Space, Switch, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { GuestDataType, TableGuests } from "./TableGuests";
import { AllAttendingGuests } from "./AllAttendingGuests";
import CreateTable from "./CreateTable";
import {
  deleteTable,
  getAllTableGuests,
  getTableData,
} from "../../../services/TableService";
import { ExclamationCircleOutlined } from "@ant-design/icons";

interface TableDataType {
  id?: number;
  key: string;
  table_number: number;
  status: "available" | "reserved" | "occupied";
  capacity: number;
  table_guests_count: number;
}

interface GuestsDataType {
  row: TableDataType;
  guests: GuestDataType[];
}

export const TableLists = () => {
  const [tableData, setTableData] = useState<TableDataType[]>([]);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [selectedGuestTable, setSelectedGuestTable] =
    useState<TableDataType | null>(null);
  const [isCreateTableModalOpen, setIsCreateTableModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [guestData, setGuestData] = useState<GuestDataType[]>([]);
  const [showNames, setShowNames] = useState(false);
  const [tableGuestsData, setTableGuestsData] = useState<any[]>([]);

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
      render: (_, data) => (
        <div>
          {data.table_guests_count}/{data.capacity}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, data) => (
        <Space size="middle">
          <Button
            onClick={async (e) => {
              e.stopPropagation();

              Modal.confirm({
                title: "Are you sure you want to delete this table?",
                icon: <ExclamationCircleOutlined />,
                content: "This action cannot be undone.",
                okText: "Yes",
                okType: "danger",
                cancelText: "No",
                onOk: async () => {
                  try {
                    const response = await deleteTable(
                      (data as { id: number }).id
                    );
                    setTableData(response.tables);
                  } catch (error) {
                    console.error("Error deleting table:", error);
                  }
                },
              });
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
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await getTableData();
      setTableData(response.tables);
      setTableGuestsData(response.tables_guests);
      console.log("response:", response);
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    setIsLoading(false);
  }, []);

  const handleRowClick = async (record: TableDataType) => {
    const rowId = record.id as number;
    try {
      const guestsDataResponse = await getAllTableGuests(rowId);
      console.log("getAllTableGuests guestsDataResponse", guestsDataResponse);
      const guestsData: GuestsDataType = {
        row: record,
        guests: guestsDataResponse.attendingGuests,
      };

      setGuestData(guestsData.guests);
      setSelectedGuestTable(guestsData.row);
      setIsGuestModalOpen(true);
    } catch (error) {
      console.error("Error fetching guests data:", error);
    }
  };

  const handleCreateTable = (tableData: any) => {
    setIsCreateTableModalOpen(false);
    setTableData(tableData.tables);
  };

  const status = (statusType: string) => (
    <div
      className={`w-3 h-3 rounded-full ${
        statusType === "waiting"
          ? "bg-blue-500"
          : statusType === "arrived"
          ? "bg-green-500"
          : statusType === "not-arrived"
          ? "bg-red-500"
          : ""
      } border border-gray-400 shadow-md`}
    />
  );

  const handleCloseTableGuestModal = () => {
    setIsGuestModalOpen(false);

    fetchData();
  };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 p-4">
      <div className="relative w-full flex items-center justify-center">
        <div className="bg-blue-400">
          <Switch
            checked={showNames}
            onChange={() => setShowNames(!showNames)}
            className="absolute top-2 right-0 z-10"
            size="small"
          />
          <p className="absolute top-8 right-0 z-10 text-sm">
            {showNames ? "Hide names" : "Show names"}
          </p>
        </div>
        <div className="flex items-center gap-48">
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
      </div>

      {/* SIMPLE LIST TABLE UI */}
      {!showNames && (
        <Table<TableDataType>
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
            style: { cursor: "pointer" },
          })}
          columns={columns}
          dataSource={tableData}
          loading={isLoading}
        />
      )}

      {/* SHOW GUESTS NAMES ON EACH TABLE */}
      {showNames && (
        <div className="w-full h-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-4">
            {/* Table */}

            {tableData.map((table: any) => (
              <div
                key={table.id + table.table_number}
                className="w-72 bg-gray-200 rounded p-2 border-2 shadow-[2px_2px_5px_-2px_rgba(0,0,0,0.3)]"
              >
                <div
                  className="flex flex-col gap-2 w-full h-full bg-gray-100 p-4 rounded-md hover:bg-[rgba(0,0,0,0.05)] transition-colors duration-100 cursor-pointer"
                  onClick={() => handleRowClick(table)}
                >
                  {/* Table members */}
                  <h1 className="text-xl text-center">
                    Table #{table.table_number}
                  </h1>
                  <div className="flex flex-col gap-2">
                    {(tableGuestsData[table.id] || []).map(
                      (guest: any, index: number) => (
                        <div
                          key={guest.id + index}
                          className="flex justify-between items-center"
                        >
                          <h3 className="courgette">{index + 1}.</h3>
                          <div className="w-full pl-2">
                            <h3 className="courgette">
                              {guest.name} {guest.middle} {guest.lastname}
                            </h3>
                          </div>
                          {status(guest.status)}
                        </div>
                      )
                    )}
                    {(tableGuestsData[table.id] || []).length === 0 && (
                      <div className="flex justify-center items-center">
                        <h3 className="text-center text-sm">Not added one</h3>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal
        open={isGuestModalOpen}
        onCancel={handleCloseTableGuestModal}
        width={1000}
        footer={null}
      >
        <TableGuests
          tableId={selectedGuestTable?.id as number}
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
        <CreateTable onCreated={handleCreateTable} />
      </Modal>
    </div>
  );
};
