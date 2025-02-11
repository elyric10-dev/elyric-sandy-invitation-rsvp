import { Outlet } from "react-router-dom";
import HeaderLayout from "./HeaderLayout";

const AdminLayout = () => {
  return (
    <div className="min-h-screen">
      <HeaderLayout />
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
