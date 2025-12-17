import { Outlet } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { ScrollArea } from "./components/ui/scroll-area";

function App() {
  return <ScrollArea>
    <Navbar />
    <main className="max-w-7xl w-full mx-auto">
      <Outlet />
    </main>
  </ScrollArea>;
}

export default App;
