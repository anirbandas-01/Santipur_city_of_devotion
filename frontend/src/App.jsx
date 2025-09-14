import React from "react";
import { Routes, Route, Link  } from "react-router-dom";
import './App.css';
import Temples from './pages/Temples.jsx';

function App() {

  return (
      <div className="App">
      <nav>
      <Link to="/temples">Temples</Link> 
     </nav>

      <Routes>
        <Route path="/temples" element={<Temples />} />
      </Routes> 

      </div>
    
  );
}

export default App;
