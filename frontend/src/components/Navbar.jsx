import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-mb sticky top-0 z-50">
            <div  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    {/*Logo*/}
                    <link to="/" className="text-2xl font-playfair text-primary-600">
                        DivineSpace
                    </link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex space-x-6">
                        {["/", "/gods", "/devotions","/about","/contact"].map((path, i)=>(
                            <NavLink 
                            key={path}
                            to={path}
                            className={({isActive})=>
                            `px-3 py-2 rounded-md text-sm font-medium ${
                            isActive? "text-primary-600 font-semibold": "text-gray-700 hover:text-primary-600"}`
                        }
                        >
                            {["Home", "Gods", "Devotions", "About", "Contact"][i]}
                            </NavLink>
                        ))}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex space-x-4">
                        <Link to="/login" className="px-4 py-2 rounded-lg border border-primary-600 text-primary-600 hover:bg-primary-50">
                          Login                    
                        </Link>
                        <Link to="/signup" className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700">
                          Sign Up
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button 
                    onClick={()=> setIsOpen(!isOpen)}
                    className="md:hidden text-gray-700" aria-label="Menu toggle">
                        {isOpen? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

                 {/* Mobile Nav */}
                 {isOpen && (
                    <div className="md:hidden bg-white shadow-md">
                        <div className="px-4 pt-2 pb-3 space-y-1">
                            {["/", "/gods", "/devotions", "/about", "/contact"].map((path, i)=>(
                            <NavLink 
                            key={path}
                            to={path}
                            className={({isActive})=>
                            `block px-3 py-2 rounded-md text-base font-medium ${
                            isActive? "text-primary-600 font-semibold": "text-gray-700 hover:text-primary-600"}`
                          }
                           onClick={()=> setIsOpen(false)}
                            >
                                {["Home", "Gods", "Devotions", "About", "Contact"][i]}
                            </NavLink>
                            ))}
                            <link to="/login" className="block px-3 py-2">Login</link>
                            <link to="/signup" className="block px-3 py-2">signup</link>
                        </div>
                    </div>
                 )}

        </nav>
    );
}