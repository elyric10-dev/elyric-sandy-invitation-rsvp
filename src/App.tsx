import "./App.css";
import { ConfigProvider } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RSVPPage from "./pages/RSVPPage/RSVPPage";
import CreateInvitation from "./pages/CreateInvitation";
import ErrorPage from "./pages/ErrorPage";
import { PassPage } from "./pages/PassPage";
// import MobileOnlyWrapper from "./component/Wrapper/MobileOnlyWrapper";
import { AdminPage } from "./pages/AdminPage/AdminPage";
import BackgroundMusic from "./component/BackgroundMusic";
import AdminLogin from "./pages/AdminPage/AdminLogin";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#dc2626",
        },
      }}
    >
      {/* <MobileOnlyWrapper> */}
      <BrowserRouter>
        <Routes>
          <Route path="/create-invitation" element={<CreateInvitation />} />
          <Route path="/rsvp/:invitationCode" element={<RSVPPage />} />
          <Route path="/pass/:invitationCode" element={<PassPage />} />

          {/* ADMIN PAGE */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/seat-plan" element={<AdminPage />} />

          {/* // ERROR PAGE */}
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
      {/* </MobileOnlyWrapper> */}
    </ConfigProvider>
  );
}

export default App;
