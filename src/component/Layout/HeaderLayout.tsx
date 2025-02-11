import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface MenuItem {
  menu: string;
  link: string;
}

const HeaderLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { menu: "Dashboard", link: "/admin/dashboard" },
    { menu: "Invitation", link: "/admin/invitation" },
    { menu: "Guests", link: "/admin/guests" },
    { menu: "Attendance", link: "/admin/attendance" },
    { menu: "Seat Plan", link: "/admin/seat-plan" },
  ];

  // Find active tab based on current path
  const activeTab =
    menuItems.find((item) =>
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
          <span className="ml-2 text-xl font-semibold">Event Service</span>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 flex justify-center items-center">
          <ul className="flex space-x-2">
            {menuItems.map((item) => (
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
        <div className="flex items-center space-x-4">
          <div className="h-8 w-8 border border-violet-700 rounded-full bg-gray-200 overflow-hidden">
            <img
              src="/api/placeholder/32/32"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderLayout;
