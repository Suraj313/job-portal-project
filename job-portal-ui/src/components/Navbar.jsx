import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const { user, logout, loading } = useContext(AuthContext);

    if (loading) {
        return <div className="bg-white shadow-sm"><nav className="container mx-auto px-6 py-4 h-[68px]"></nav></div>;
    }

    return (
        <header className="bg-white shadow-sm sticky top-0 z-20">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">
                    <Link to="/">Job Portal</Link>
                </h1>
                <div className="flex items-center space-x-4">
                    {user ? (
                        <>
                            <span className="text-gray-600 hidden sm:inline">Welcome, {user.email}</span>
                            <button
                                onClick={logout}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-600 hover:text-indigo-600 font-semibold">Login</Link>
                            <Link to="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};
export default Navbar;