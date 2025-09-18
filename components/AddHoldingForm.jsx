import React, { useState } from 'react';
import API from '../src/api.js';

export default function AddHoldingForm({ form, setForm, editId, onSubmit }){


  // const [symbol, setSymbol] = useState('');
  // const [name, setName] = useState('');
  // const [quantity, setQuantity] = useState('');
  // const [avgCost, setAvgCost] = useState('');
  // const [currentPrice, setCurrentPrice] = useState('');

  // const submit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await API.post('/holdings', { symbol, name, quantity, avgCost, currentPrice });
  //     setSymbol(''); setName(''); setQuantity(''); setAvgCost(''); setCurrentPrice('');
  //     onAdded();
  //   } catch (err) {
  //     alert(err.response?.data?.error || 'Add failed');
  //   }
  // };



  return (
    <form onSubmit={onSubmit} className="space-y-2 mt-10">
      <input 
        value={form.symbol} 
        onChange={e => setForm({ ...form, symbol: e.target.value })} 
        placeholder="Symbol (AAPL)" 
        className="w-full p-2 border rounded"
      />
      <input 
        value={form.name} 
        onChange={e => setForm({ ...form, name: e.target.value })} 
        placeholder="Name (optional)" 
        className="w-full p-2 border rounded"
      />
      <input 
        value={form.quantity} 
        onChange={e => setForm({ ...form, quantity: e.target.value })} 
        placeholder="Quantity" 
        type="number" 
        className="w-full p-2 border rounded"
      />
      <input 
        value={form.avgCost} 
        onChange={e => setForm({ ...form, avgCost: e.target.value })} 
        placeholder="Avg Cost per share" 
        type="number" 
        className="w-full p-2 border rounded"
      />
      <input 
        value={form.currentPrice} 
        onChange={e => setForm({ ...form, currentPrice: e.target.value })} 
        placeholder="Current Price" 
        type="number" 
        className="w-full p-2 border rounded"
      />
      <button className="w-full bg-blue-600 text-white p-2 rounded cursor-pointer">
        {editId ? "Update Holding" : "Add Holding"}
      </button>
    </form>
  );
}
