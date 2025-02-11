import "./App.css";
import { ConfigProvider } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RSVPPage from "./pages/RSVPPage/RSVPPage";
import CreateInvitation from "./pages/CreateInvitation";
import ErrorPage from "./pages/ErrorPage";
import { PassPage } from "./pages/PassPage";
import { MyVow } from "./component/MyVow";
import AdminLayout from "./component/Layout/AdminLayout";
import { Invitation } from "./pages/AdminPage/Tabs/Invitation";
import { Guests } from "./pages/AdminPage/Tabs/Guests";
import { Attendance } from "./pages/AdminPage/Tabs/Attendance";
import { SeatPlan } from "./pages/AdminPage/Tabs/SeatPlan";
import Dashboard from "./pages/AdminPage/Tabs/Dashboard";
import { useEffect } from "react";
import { getDashboardData } from "./services/dashboardService";
import React from "react";

function App() {
  const [dashboardData, setDashboardData] = React.useState<any>({});

  // const data = {
  //   guests: 0,
  //   accepted: 0,
  //   rejected: 0,
  //   "no response": 0,
  //   arrived: 0,
  //   absent: 0,
  //   "tables count": 0,
  //   kids: 0,
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDashboardData();
        setDashboardData(response);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#dc2626",
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/my-vow" element={<MyVow />} />
          <Route path="/rsvp/:invitationCode" element={<RSVPPage />} />
          <Route path="/pass/:invitationCode" element={<PassPage />} />
          <Route path="/error" element={<ErrorPage />} />

          {/* ADMIN PAGE */}
          {/* <Route path="/admin/dashboard" element={<HeaderLayout />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/seat-plan" element={<AdminPage />} /> */}

          {/* // ERROR PAGE */}

          {/* Admin Routes with HeaderLayout */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route
              path="dashboard"
              element={<Dashboard data={dashboardData} />}
            />
            <Route path="invitation" element={<CreateInvitation />} />
            <Route path="guests" element={<Guests />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="seat-plan" element={<SeatPlan />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
