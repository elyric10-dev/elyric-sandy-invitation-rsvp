import { api } from "./api";

interface tableDataType {
  table_number: number;
  capacity: number;
  status: string;
}

export const getAllTableGuests = async (tableId: number) => {
  try {
    const response = await api.get(`admin/seat-plan/guests/${tableId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching guests by table id:", error);
    throw error;
  }
};

export const getTableData = async () => {
  try {
    const response = await api.get("admin/seat-plan");
    console.log("getTableData response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching table data:", error);
    throw error;
  }
};

export const createTable = async (tableData: tableDataType) => {
  try {
    const response = await api.post("admin/seat-plan", tableData);
    return response.data;
  } catch (error) {
    console.error("Error creating table:", error);
    throw error;
  }
};

export const deleteTable = async (tableId: number) => {
  try {
    const response = await api.delete(`admin/seat-plan/${tableId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting table:", error);
    throw error;
  }
};
