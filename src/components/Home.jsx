import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center px-4">
      <div className="backdrop-blur-3xl bg-white/10 border border-white/20 rounded-[2rem] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] p-10 max-w-lg w-full text-center text-white">
        <h1 className="text-5xl font-extrabold mb-4 text-white drop-shadow-lg">Welcome to TaskFlow</h1>
        <p className="text-gray-200 text-lg mb-8">
          Organize your life, one task at a time. Focus. Finish. Celebrate.
        </p>
        <div className="flex gap-2 justify-center">
          <button
           onClick={() => navigate('/login')}
            className="bg-purple-900 cursor-pointer hover:bg-purple-700 text-white px-8 py-2 rounded-xl transition shadow-lg"
          >
            Login
          </button>
          <button
           onClick={() => navigate('/signup')}
            className="bg-white/20 cursor-pointer hover:bg-white/30 text-white px-6 py-1 rounded-xl transition border border-white/30"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;