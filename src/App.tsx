import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Dashboard from "./screen/pages/Dashboard"
import Login from "./screen/pages/login";
import "./index.css";

export default function App() {
  const loggedIn = true;

  if (!loggedIn) return <Login />;

  return (
   <div className="h-screen flex flex-col bg-background text-textPrimary">

      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-background">
          <Dashboard />
        </main>
      </div>
    </div>
  );
}
