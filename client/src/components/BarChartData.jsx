import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function TransactionBarChart() {
  const [data, setData] = useState([]);

  const [selectedMonth, setSelectedMonth] = useState('1');

  

  useEffect(() => {
    const apiUrl = `http://localhost:4000/api/bar-chart-data?month=${selectedMonth}`;

    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response);
        const data = response.data;
        
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [selectedMonth]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div>
      <h2>Transaction Bar Chart</h2>
      <select value={selectedMonth} onChange={handleMonthChange}>
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="priceRange" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="itemCount" fill="rgba(75, 192, 192, 0.2)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TransactionBarChart;
