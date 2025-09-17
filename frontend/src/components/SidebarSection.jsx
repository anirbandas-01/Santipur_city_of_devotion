import { useState } from "react";
import { X } from "lucide-react";

export default function SidebarSection({ isOpen, toggleSidebar }){
    return (
       <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform ${isOpen ? "translate-x-0": "-translate-x-full"}
        transition-transform duration-300 ease-in-out z-50`}
        >
            
            {/* Close button */}
            <button className="absolute top-4 right-4 text-gray-700" onClick={toggleSidebar}
            >
                <X size={24} />
            </button>

            {/* Sidebar Content */}
            <div className="mt-12 flex flex-col space-y-4 p-4">
                <a href="#temple" className="hover:text-blue-600">
                    Temples
                </a>
                <a href="#resturent" className="hover:text-blue-600">
                    Resturent
                </a>
                <a href="#festivals" className="hover:text-blue-600">
                    Festivals
                </a>
                <a href="#hotels" className="hover:text-blue-600">
                    Hotels
                </a>
                <a href="#sareeMarket" className="hover:text-blue-600">
                    Saree Market
                </a>
            </div>
        </div>
    );
}