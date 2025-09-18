import React, { useState } from 'react';
import API from '../src/api.js';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', { username, email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.error || 'Register failed');
    }
  };

  return (
    <div className='flex justify-center items-center h-[80vh]'>
      <img src="https://plus.unsplash.com/premium_photo-1664476845274-27c2dabdd7f0?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3RvY2slMjBtYXJrZXR8ZW58MHx8MHx8fDA%3D" alt="Stock Market" className="w-[100%] h-[100%] opacity-65 rounded-[50%]"/>
    <div className="max-w-md mx-auto p-6 rounded bg-[#fafbfb8c] shadow-2xl shadow-black absolute">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" className="w-full p-2 rounded outline placeholder-black  "/>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 outline rounded placeholder-black"/>
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-2 outline rounded placeholder-black"/>
        <button className="w-full bg-green-600 text-white p-2 rounded">Register</button>
      </form>
    </div>
    </div>
  );
}
