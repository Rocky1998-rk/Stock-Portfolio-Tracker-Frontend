import React from 'react';
import API from '../src/api.js';

export default function HoldingsList({ holdings = [], onUpdated, onEdit }) {

  const remove = async (id) => {
    if (!confirm('Delete holding?')) return;
    try {
      await API.delete(`/holdings/${id}`);
      onUpdated();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="space-y-3">
      {holdings.length === 0 && <div className="p-4 bg-white rounded shadow">No holdings yet</div>}
      {holdings.map(h => (
        <div key={h._id} className="p-3 bg-white rounded shadow flex justify-between items-center">
          <div>
            <div className="font-semibold">{h.symbol} {h.name && <span className="text-sm text-gray-500">- {h.name}</span>}</div>
            <div className="text-sm">Qty: {h.quantity} | Avg: ₹{h.avgCost} | Curr: ₹{h.currentPrice}</div>
          </div>
          <div className="text-right">
           <div>Value: ₹{h.gainLoss?.current?.toFixed(2)}</div>
           <div className={h.gainLoss?.absolute >= 0 ? 'text-green-600' : 'text-red-600'}>
          {h.gainLoss?.absolute >= 0 ? '+' : ''}₹{h.gainLoss?.absolute} ({h.gainLoss?.percent?.toFixed(2)}%)
         </div>


            <div className="mt-2 flex gap-3 justify-end">
              <button onClick={()=>onEdit(h)} className="text-sm text-blue-500 cursor-pointer">Edit</button>
              <button onClick={()=>remove(h._id)} className="text-sm text-red-500 cursor-pointer">Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
