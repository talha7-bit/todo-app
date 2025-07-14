import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginsuccess } from '../redux/authSlice';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Make sure this path is correct
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [error, seterror] = useState();
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const navigate=useNavigate();

  const loginh = async (data) => {
    try {
      const usercred = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = usercred.user;
      dispatch(loginsuccess({ email: user.email, uid: user.uid, password: data.password }));
      console.log("Login was successful");
      toast.success("login successfully")
      navigate('/function')
    } catch (error) {
      console.error("An error occurred while login");
      seterror("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center px-4">
      <div className="backdrop-blur-3xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-10 max-w-md w-full text-white">
        <h2 className="text-2xl font-semibold mb-6 text-center drop-shadow-lg">Login to your account</h2>
        <form onSubmit={handleSubmit(loginh)} className="space-y-3">
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: true })}
              className="w-full px-5 py-2 bg-white/20 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-white-30/20 placeholder-white"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
              className="w-full px-5 py-2 bg-white/20 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-white placeholder-white"
            />
          </div>
          <button
            type="submit"
            className="py-2 px-5 cursor-pointer mt-1 mx-35 rounded-lg bg-purple-900 hover:bg-purple-700 transition text-white font-semibold shadow-lg"
          >
            Login
          </button>
        </form>
        <div className='mt-10 flex flex-col items-center justify-center'>
        <p className='text-sm'>Don not have an account</p>
        <button className='px-4 py-2 mt-1 cursor-pointer rounded-lg bg-purple-900 hover:bg-purple-700 transition text-white font-semibold shadow-lg' onClick={()=>navigate('/signup')}>Signup</button>
       </div>
       </div>
       {error && <p className='text-red-500 px-3 py-1 mt-2'>{error}</p>}
    </div>
  );
};

export default Login;