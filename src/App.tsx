import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Dashboard from "./screen/pages/Dashboard";
import Backtesting from "./screen/pages/Backtesting";
import Login from "./screen/pages/login";
import "./index.css";

export default function App() {
  const loggedIn = true;

  if (!loggedIn) return <Login />;

  return (
    <BrowserRouter>
      <div className="h-screen flex flex-col bg-background text-textPrimary">
        <Navbar />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar />

          <main className="flex-1 overflow-y-auto bg-background">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/backtesting" element={<Backtesting />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
