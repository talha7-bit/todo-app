import React from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
import Function from './components/Function'
import Completed from './components/Completed'
import Home from './components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const App = () => {
  return (
    <BrowserRouter>
    <ToastContainer position="top-center" autoClose={3000} />
    <Routes>
      <Route index element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/function' element={<Function/>}/>
      <Route path='/completed' element={<Completed/>}/>
    </Routes>
    
    </BrowserRouter>
  )
}

export default App
