import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TransactionsTable from "./components/TransactionTable";
import TransactionBarChart from "./components/BarChartData";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TransactionsTable />} />
        <Route path="/" element={<TransactionBarChart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
