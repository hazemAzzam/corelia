import { Outlet } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";

function App() {
  return <div>
    <Navbar />
    <main className="max-w-7xl w-full mx-auto">
      <Outlet />
    </main>
  </div>;
}

export default App;
