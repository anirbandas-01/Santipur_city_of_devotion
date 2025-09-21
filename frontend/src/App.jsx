//import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { createBrowserRouter,  RouterProvider} from 'react-router-dom';

//layout wrapper
import Layout from './components/Layout';
import './App.css'

//pages
import Home from './pages/Home';
import Temples  from './pages/Temples';
import Festivals from './pages/Festivals';


function App() {

const router = createBrowserRouter([
    {
      
      element: <Layout />, // 👈 Common Navbar + Sidebar + Footer
      children: [
        { path: "/", element: <Home /> },
        { path: "/temples", element: <Temples /> },
        { path: "/festivals", element: <Festivals /> },
      ],
    },
  ]);


  return <RouterProvider router={router} />;

}

export default App;
