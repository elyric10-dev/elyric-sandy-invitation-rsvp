import { GuestDataType } from "../pages/AdminPage/Section/AllAttendingGuests";
import { api } from "./api";

interface tableDataType {
  table_number: number;
  capacity: number;
  status: string;
}

export const exportTablesGuests = async () => {
  try {
    const response = await api.get("admin/seat-plan/tables-guests");
    return response.data;
  } catch (error) {
    console.error("Error fetching tables:", error);
    throw error;
  }
};

export const getAllTablesWithGuests = async () => {
  try {
    const response = await api.get("admin/seat-plan/tables");
    return response.data;
  } catch (error) {
    console.error("Error fetching tables with guests:", error);
    throw error;
  }
};

export const deleteGuestFromTable = async ({
  id_to_delete,
  table_id,
  is_kid,
}: {
  id_to_delete: number;
  table_id: number;
  is_kid: boolean;
}) => {
  const data = { id_to_delete, table_id, is_kid };
  try {
    const response = await api.delete(
      `admin/seat-plan/guests/${id_to_delete}`,
      { data }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting guest from table:", error);
    throw error;
  }
};

export const addGuestToTable = async ({
  table_id,
  selectedGuests,
  selectedKids,
}: {
  table_id: number;
  selectedGuests: GuestDataType[];
  selectedKids: GuestDataType[];
}) => {
  const data = {
    table_id,
    selectedGuests,
    selectedKids,
  };

  try {
    const response = await api.post(`admin/seat-plan/guests`, data);
    return response.data;
  } catch (error) {
    console.error("Error adding guest to table:", error);
    throw error;
  }
};

export const getAllAttendingGuests = async () => {
  try {
    const response = await api.get("admin/seat-plan/guests");
    return response.data;
  } catch (error) {
    console.error("Error fetching attending guests:", error);
    throw error;
  }
};

export const getAllTableGuests = async (tableId: number) => {
  try {
    const response = await api.get(`admin/seat-plan/tables/${tableId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching guests by table id:", error);
    throw error;
  }
};

export const getTableData = async () => {
  try {
    const response = await api.get("admin/seat-plan/tables");
    return response.data;
  } catch (error) {
    console.error("Error fetching table data:", error);
    throw error;
  }
};

export const createTable = async (tableData: tableDataType) => {
  try {
    const response = await api.post("admin/seat-plan/tables", tableData);
    return response.data;
  } catch (error) {
    console.error("Error creating table:", error);
    throw error;
  }
};

export const deleteTable = async (tableId: number) => {
  try {
    const response = await api.delete(`admin/seat-plan/tables/${tableId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting table:", error);
    throw error;
  }
};
