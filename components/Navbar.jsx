import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar(){
  const navigate = useNavigate();
  const logged = localStorage.getItem('token');

    const handleLogout = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');

  };
  return (
    <nav className="bg-[#060653ec] shadow">
      <div className="container mx-auto px-4 py-5 flex justify-between items-center">
        <Link to="/" className="font-semibold text-lg text-white">StockTracker</Link>
        <div>
          {logged ? (
            <button onClick={handleLogout} className="px-3 py-1 bg-red-500 text-white rounded cursor-pointer">Logout</button>
          ) : (
            <>
              <Link to="/login" className="px-3 text-white">Login</Link>
              <Link to="/" className="px-3 text-white">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
