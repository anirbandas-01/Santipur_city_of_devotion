import { BrowserRouter as Router ,Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from './pages/Home';

function App() {
  return (
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 p-6">
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </main>
          </div>
        </div>
  );
}
export default App;
