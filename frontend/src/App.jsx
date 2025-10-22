//import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { createBrowserRouter,  RouterProvider} from 'react-router-dom';

//layout wrapper
import Layout from './components/Layout';
import './App.css'

//pages
import Home from './pages/Home';
import About from './pages/About';
import Temples  from './pages/Temples';
import Festivals from './pages/Festivals';
import Gallery from './pages/Gallery';
import Restaurants from './pages/Restaurants';
import SareeMarket from './pages/SareeMarket';
import Reviews from './pages/Reviews';

function App() {

const router = createBrowserRouter([
    {
      
      element: <Layout />, // 👈 Common Navbar + Sidebar + Footer
      children: [
        { path: "/", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/temples", element: <Temples /> },
        { path: "/festivals", element: <Festivals /> },
        { path: "/gallery", element: <Gallery /> },
        { path: "/restaurants", element: <Restaurants /> },
        { path: "/sareeMarket", element: <SareeMarket /> },
        {path: "/reviews", element: <Reviews />}
        
      ],
    },
  ]);


  return <RouterProvider router={router} />;

}

export default App;
