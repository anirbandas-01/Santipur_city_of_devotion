import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import SidebarSection from "./SidebarSection";
import Footer from "./Footer";
import AnimationProvider from "./AnimationProvider";
import ScrollToTop from "./ScrollToTop";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    console.log("toggleSidebar called, state:", !sidebarOpen);
    setSidebarOpen(!sidebarOpen);
  };

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <AnimationProvider />
      <ScrollToTop />

      {/* Navbar (always visible) */}
      <Navbar
        toggleSidebar={toggleSidebar}
        scrollToSection={scrollToSection}
        sidebarOpen={sidebarOpen}
      />

      {/* Sidebar (always mounted, just hidden) */}
      <SidebarSection
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        scrollToSection={scrollToSection}
      />

      {/* Page content goes here */}
      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
