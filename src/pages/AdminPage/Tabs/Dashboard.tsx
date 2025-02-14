import React, { useEffect } from "react";
import { Card } from "antd";
import { getDashboardData } from "../../../services/dashboardService";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { setDashboardData } from "../../../redux/slices/dashboardSlices";
import { setUserData } from "../../../redux/slices/userSlice";

const Dashboard = () => {
  const userData = useAppSelector((state) => state.user.userData);
  const dashboardData = useAppSelector(
    (state) => state.dashboard.dashboardData
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDashboardData();
        dispatch(setDashboardData(response));
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Updated userData: ", dashboardData);
  }, [dashboardData]);

  const coordinatorAllowedKeys = [
    "Arrived Guests",
    "Incoming Guests",
    "Expected Guests",
    "Kids Count",
  ];
  const filteredData =
    userData.user_role_id === 1
      ? dashboardData // Show all for admins
      : Object.fromEntries(
          Object.entries(dashboardData).filter(([key]) =>
            coordinatorAllowedKeys.includes(key)
          )
        );

  const getBackgroundColor = (key: string) => {
    switch (key) {
      case "Arrived Guests":
        return "bg-green-400";
      case "Expected Guests":
        return "bg-blue-400";
      case "Incoming Guests":
        return "bg-orange-400";
      case "Rejected Invitation":
        return "bg-yellow-400";
      case "Absent Guests":
        return "bg-red-400";
      case "No Response":
        return "bg-black";
      case "Kids Count":
        return "bg-pink-400";
      case "Invited Guests":
        return "bg-purple-400";
      default:
        return "bg-gray-400";
    }
  };

  const getCardBackgroundColor = (key: string) => {
    switch (key) {
      case "Arrived Guests":
        return "bg-green-100";
      case "Expected Guests":
        return "bg-blue-100";
      case "Incoming Guests":
        return "bg-orange-100";
      case "Rejected Invitation":
        return "bg-yellow-100";
      case "Absent Guests":
        return "bg-red-100";
      case "No Response":
        return "bg-gray-100";
      case "Kids Count":
        return "bg-pink-100";
      case "Invited Guests":
        return "bg-purple-100";
      default:
        return "bg-gray-100";
    }
  };

  const getTextColor = (key: string) => {
    switch (key) {
      case "Arrived Guests":
        return "text-green-700";
      case "Expected Guests":
        return "text-blue-700";
      case "Incoming Guests":
        return "text-orange-700";
      case "Rejected Invitation":
        return "text-yellow-700";
      case "Absent Guests":
        return "text-red-700";
      case "No Response":
        return "text-black";
      case "Kids Count":
        return "text-pink-700";
      case "Invited Guests":
        return "text-purple-700";
      default:
        return "text-gray-700";
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full text-center">
        <h2 className="text-3xl font-semibold text-gray-800">Dashboard</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3">
        {Object.entries(filteredData).map(([key, value]: any) => (
          <div key={key} className="flex flex-col m-2 w-48 shadow-md">
            <h3
              className={`${getBackgroundColor(
                key
              )} text-white p-4 text-lg font-medium rounded-t-md`}
            >
              {key}
            </h3>
            <h1
              className={`${getTextColor(key)} ${getCardBackgroundColor(
                key
              )} font-semibold p-4 text-5xl`}
            >
              {value}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
