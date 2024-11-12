// src/components/Navbar.tsx
import React, { useState } from 'react';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <div className="text-white text-2xl font-bold">
                    Tuku Rei
                </div>

                {/* Menu items */}
                <div className={`hidden md:flex space-x-4 ${isOpen ? 'block' : 'hidden'}`}>
                    <a href="#" className="text-white hover:text-gray-200">
                        Home
                    </a>
                    <a href="#" className="text-white hover:text-gray-200">
                        Shop
                    </a>
                    <a href="#" className="text-white hover:text-gray-200">
                        About
                    </a>
                    <a href="#" className="text-white hover:text-gray-200">
                        Contact
                    </a>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
                        {/* Replace with a hamburger icon if needed */}
                        ☰
                    </button>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;