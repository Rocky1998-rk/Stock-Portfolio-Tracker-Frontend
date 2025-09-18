import React, { useState } from 'react';
import API from '../src/api.js';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      console.log("Login response:", res.data);

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };
 
  return (
    <div className='flex justify-center items-center h-[80vh]'>
      <img src="https://static.hdfcsky.com/wp-content/uploads/2025/07/1752034770500.webp" alt="Stock Market" className="w-[100%] h-[100%] opacity-65 rounded-[50%]"/>
    <div className="max-w-md mx-auto  p-7 rounded shadow-2xl  shadow-black bg-[#f3f6f682] absolute">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2  rounded outline bg-[#e3dfdf7b] placeholder-black"/>
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-2  rounded outline bg-[#e3dfdf7b] placeholder-black"/>
        <button className="w-full bg-blue-600 text-white p-2 rounded cursor-pointer">Login</button>
      </form>
    </div>
    </div>
  );
}
