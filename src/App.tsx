import "./App.css";
import { ConfigProvider } from "antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RSVPPage from "./pages/RSVPPage";
import CreateInvitation from "./pages/CreateInvitation";
import ErrorPage from "./pages/ErrorPage";

function App() {
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
          <Route path="/create-invitation" element={<CreateInvitation />} />
          <Route path="/rsvp/:invitationCode" element={<RSVPPage />} />

          {/* // ERROR PAGE */}
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
