import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-6 py-3">
                <div className="flex justify-between items-center">
                    <div className="text-2xl font-bold text-gray-800">
                        <Link to="/">Shoroter Rongdhonu</Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600">
                            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 01-1.414 1.414L12 13.414l-4.864 4.864a1 1 0 01-1.414-1.414L10.586 12 5.722 7.136a1 1 0 011.414-1.414L12 10.586l4.864-4.864a1 1 0 011.414 1.414L13.414 12l4.864 4.864z"/>
                                ) : (
                                    <path fillRule="evenodd" d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"/>
                                )}
                            </svg>
                        </button>
                    </div>

                    {/* Desktop navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="text-gray-600 hover:text-blue-500">Home</Link>
                        <Link to="/blog" className="text-gray-600 hover:text-blue-500">Blog</Link>
                        <Link to="/about" className="text-gray-600 hover:text-blue-500">About</Link>
                        <Link to="/contact" className="text-gray-600 hover:text-blue-500">Contact</Link>
                        {user && user.isAuthenticated && (
                            <Link to="/dashboard" className="text-gray-600 hover:text-blue-500">Dashboard</Link>
                        )}
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        {user && user.isAuthenticated ? (
                            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Logout</button>
                        ) : (
                            <>
                                <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Login</Link>
                                <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Register</Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile navigation with smooth transition */}
                <div className={`md:hidden mt-4 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
                    <div className="flex flex-col space-y-3">
                        <Link to="/" className="block text-gray-600 hover:text-blue-500" onClick={() => setIsOpen(false)}>Home</Link>
                        <Link to="/blog" className="block text-gray-600 hover:text-blue-500" onClick={() => setIsOpen(false)}>Blog</Link>
                        <Link to="/about" className="block text-gray-600 hover:text-blue-500" onClick={() => setIsOpen(false)}>About</Link>
                        <Link to="/contact" className="block text-gray-600 hover:text-blue-500" onClick={() => setIsOpen(false)}>Contact</Link>
                        {user && user.isAuthenticated && (
                            <Link to="/dashboard" className="block text-gray-600 hover:text-blue-500" onClick={() => setIsOpen(false)}>Dashboard</Link>
                        )}
                        {user && user.isAuthenticated ? (
                            <button onClick={handleLogout} className="block bg-red-500 text-white px-4 py-2 rounded-md text-center hover:bg-red-600">Logout</button>
                        ) : (
                            <>
                                <Link to="/login" className="block bg-blue-500 text-white px-4 py-2 rounded-md text-center hover:bg-blue-600" onClick={() => setIsOpen(false)}>Login</Link>
                                <Link to="/register" className="block bg-green-500 text-white px-4 py-2 rounded-md text-center hover:bg-green-600" onClick={() => setIsOpen(false)}>Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;