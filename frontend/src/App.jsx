import { useState } from 'react';
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { 
   createBrowserRouter,
   RouterProvider
   } from 'react-router-dom';
import AnimationProvider from './components/AnimationProvider';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar'
import SidebarSection from './components/SidebarSection'
import Footer from './components/Footer'
import './App.css'

//pages
import Home from './pages/Home';
import Temples  from './pages/Temples';



function App() {

    const [sidebarOpen, setSidebarOpen]= useState(false);
    


    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    } ;


  
  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth"
    });
  };

const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
        <AnimationProvider />
          <ScrollToTop />
          <Navbar toggleSidebar={toggleSidebar} scrollToSection={scrollToSection} sidebarOpen={sidebarOpen}/>
          <SidebarSection
            isOpen={sidebarOpen}
            toggleSidebar={toggleSidebar}
            scrollToSection={scrollToSection}
          />
          <Home />
          <Footer />
        </>
      ),
    },
    {
      path: "/temples",
      element: (
        <div className='bg-gray-50 min-h-screen flex flex-col'>
          <AnimationProvider />
          <ScrollToTop />
          <Navbar toggleSidebar={toggleSidebar} scrollToSection={scrollToSection} sidebarOpen={sidebarOpen}/>
          <SidebarSection
            isOpen={sidebarOpen}
            toggleSidebar={toggleSidebar}
            scrollToSection={scrollToSection}
          />
          <main className='flex-grow p-6'>
          <Temples />
          </main>
          <Footer />
        </div>
      ),
    },
  ]);

  return <RouterProvider router={router} />;

}

export default App;
