import { Dropdown, Menu, MenuProps } from "antd";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { clearUserData } from "../../redux/slices/userSlice";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";

interface MenuItem {
  menu: string;
  link: string;
}

const HeaderLayout = () => {
  const userData = useAppSelector((state) => state.user.userData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Logout function
  const handleLogout = () => {
    dispatch(clearUserData()); 
    navigate("/admin");
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: "Profile",
      icon: <UserOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
      className: "text-red-600 hover:!bg-red-100",
    },
  ];
let navigationItems: { menu: string; link: string }[] = [];

  if(userData.user_role_id === 1){
     navigationItems = [
      { menu: "Dashboard", link: "/admin/dashboard" },
      { menu: "Invitation", link: "/admin/invitation" },
      { menu: "Guests", link: "/admin/guests" },
      { menu: "Attendance", link: "/admin/attendance" },
      { menu: "Seat Plan", link: "/admin/seat-plan" },
    ];
  }
  if(userData.user_role_id === 2){
     navigationItems = [
      { menu: "Dashboard", link: "/admin/dashboard" },
      { menu: "Guests", link: "/admin/guests" },
      { menu: "Seat Plan", link: "/admin/seat-plan" },
    ];
  
  }

  // Find active tab based on current path
  const activeTab =
    navigationItems.find((item) =>
      currentPath.includes(item.link.split("/").pop() || "")
    )?.menu || "Dashboard";

  return (
    <header className="w-full border-b border-gray-200 bg-[#F5f5dc] px-4 py-2">
      <div className="flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-[#C8a2c8] flex items-center justify-center">
            <span className="text-white font-bold">ES</span>
          </div>
          {/* <span className="ml-2 text-xl font-semibold">Event Service</span> */}
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 flex justify-center items-center">
          <ul className="flex space-x-2">
            {navigationItems.map((item) => (
              <li key={item.menu}>
                <button
                  onClick={() => navigate(item.link)}
                  className={`text-gray-600 hover:text-[#C8a2c8] px-2 py-1 text-md transition-colors
                    ${
                      activeTab === item.menu
                        ? "border-b-[3px] border-[#C8a2c8] text-gray-900"
                        : ""
                    }`}
                >
                  {item.menu}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Section */}
        <Dropdown menu={{items: menuItems}} trigger={["click"]}>
      <div className="flex items-center space-x-4 cursor-pointer">
        <div className="h-8 w-8 border border-violet-700 rounded-full bg-gray-200 overflow-hidden">
          <img
            src="/api/placeholder/32/32"
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </Dropdown>
      </div>
    </header>
  );
};

export default HeaderLayout;
