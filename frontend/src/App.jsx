import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Slideshow from "./components/Slideshow";
import { Sidebar } from "lucide-react";

function App() {
  return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-50">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
  );
}
export default App;
