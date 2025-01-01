import { Button } from "antd";
import React from "react";
import { createTable } from "../../../services/TableService";

const CreateTable = ({ onCreated }: { onCreated: (data: any) => void }) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const tableNumber = (
      form.elements.namedItem("tableNumber") as HTMLInputElement
    ).value;
    const capacity = (form.elements.namedItem("capacity") as HTMLInputElement)
      .value;
    const status = (form.elements.namedItem("status") as HTMLSelectElement)
      .value;

    const data = {
      table_number: parseInt(tableNumber),
      capacity: parseInt(capacity),
      status: status,
    };

    try {
      const response = await createTable(data);
      console.log("Create Table response:", response);
      onCreated(response);
    } catch (error) {
      console.error("Error creating table:", error);
    }
  };
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-3xl font-semibold">Add new Table</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 p-4"
      >
        <div className="w-full flex justify-between items-center gap-4">
          <label>Table Number:</label>
          <input
            type="number"
            name="tableNumber"
            required
            className="border border-violet-500 rounded-md pl-2 py-1"
          />
        </div>
        <div className="w-full flex justify-between items-center">
          <label>Capacity:</label>
          <input
            type="number"
            name="capacity"
            required
            className="border border-violet-500 rounded-md pl-2 py-1"
          />
        </div>
        <div className="w-full flex justify-between items-center">
          <label>Status:</label>
          <select
            name="status"
            required
            className="border border-violet-500 rounded-md pl-2 py-1"
          >
            <option value="">Select Status</option>
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="reserved">Reserved</option>
          </select>
        </div>
        <Button type="primary" htmlType="submit" className="bg-purple-500">
          Create Table
        </Button>
      </form>
    </div>
  );
};

export default CreateTable;
