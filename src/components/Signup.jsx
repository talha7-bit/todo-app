import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase';
import { loginsuccess } from '../redux/authSlice';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
  const [error, seterror] = useState(null);
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const navigate=useNavigate();

  const signuph = async (data) => {
    try {
      const usercred = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = usercred.user;
      dispatch(loginsuccess({ uid: user.uid, email: user.email, password: data.password }));
      console.log("Signup successful");
      toast.success('signup was succesfull')
      navigate('/login')
      reset();
    } catch (error) {
      console.log("An error occurred while signup", error.message);
      seterror("Signup failed. Email may already in use.");
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center px-4">
      <div className="backdrop-blur-3xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-10 mx-auto w-full max-w-sm text-white">
        <h2 className="text-2xl font-semibold mb-6 text-center drop-shadow-lg">Create Your Account</h2>
        <form onSubmit={handleSubmit(signuph)} className="space-y-3 flex flex-col items-center justify-center mx-auto">
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
              placeholder="Create a password"
              {...register("password", { required: true })}
              className="w-full px-5 py-2 bg-white/20 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-white-30/20 placeholder-white"
            />
          </div>
          <button
            type="submit"
            className="py-2 px-4 cursor-pointer mt-1 mx-auto rounded-lg bg-purple-900 hover:bg-purple-700 transition text-white font-semibold shadow-lg"
          >
            SignUp
          </button>
        </form>
        <div className='mt-10 flex flex-col items-center justify-center'>
        <p className='text-sm'>move back to login page</p>
        <button  className='px-5 py-2 cursor-pointer mt-1 rounded-lg bg-purple-900 hover:bg-purple-700 transition text-white font-semibold shadow-lg' onClick={()=>navigate('/login')}>Login</button>
      </div>
      </div>
      {error && <p className='text-red-500 px-3 py-1 mt-2'>{error}</p>}
    </div>
  );
};

export default Signup;