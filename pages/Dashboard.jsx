import React, { useEffect, useState } from 'react';
import API from '../src/api.js';
import AddHoldingForm from '../components/AddHoldingForm';
import HoldingsList from '../components/HoldingsList';

// Recharts imports
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function Dashboard() {
  const [data, setData] = useState({ holdings: [], totals: {} });
  const [form, setForm] = useState({ symbol: "", name: "", quantity: "", avgCost: "", currentPrice: "" });
  const [editId, setEditId] = useState(null);

  const fetchData = async () => {
    try {
      const res = await API.get('/holdings');
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await API.put(`/holdings/${editId}`, form);
        setEditId(null);
      } else {
        await API.post('/holdings', form);
      }
      setForm({ symbol: "", name: "", quantity: "", avgCost: "", currentPrice: "" });
      fetchData();
    } catch (err) {
      alert("Save failed");
    }
  };

  const handleEdit = (holding) => {
    setForm({
      symbol: holding.symbol,
      name: holding.name || "",
      quantity: holding.quantity,
      avgCost: holding.avgCost,
      currentPrice: holding.currentPrice
    });
    setEditId(holding._id);
  };

  // Chart data (calculate currentValue per holding)
  const chartData = data.holdings.map(h => ({
    name: h.symbol,
    currentValue: h.gainLoss?.current || (h.currentPrice * h.quantity),
    invested: h.gainLoss?.invested || (h.avgCost * h.quantity)
  }));

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {/* Holdings List */}
      <div className="md:col-span-2">
        <h2 className="text-2xl font-semibold mb-2">Your Holdings</h2>
        <HoldingsList holdings={data.holdings} onUpdated={fetchData} onEdit={handleEdit} />

        {/* Chart Section */}
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Portfolio Graph</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="invested" fill="#8884d8" name="Invested Value" />
              <Bar dataKey="currentValue" fill="#82ca9d" name="Current Value" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Portfolio Summary + Form */}
      <div className="p-5 bg-white rounded shadow">
        <h3 className="font-semibold">Portfolio Summary</h3>
        <p>Invested: ₹{data.totals?.totalInvested?.toFixed(2) || 0}</p>
        <p>Current: ₹{data.totals?.totalCurrent?.toFixed(2) || 0}</p>
        <p>
          Gain/Loss: ₹{data.totals?.totalAbsolute || 0} 
          ({data.totals?.totalPercent || 0}%)
        </p>
        <hr className="my-3 mt-8"/>
        <AddHoldingForm form={form} setForm={setForm} editId={editId} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
