import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TransactionsTable() {
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('1'); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 

  useEffect(() => {
    const apiUrl = `http://localhost:4000/api/list-transactions?month=${selectedMonth}`;

    axios.get(apiUrl)
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [selectedMonth, currentPage]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTransactions = transactions.slice(startIndex, endIndex);

  return (
    <div className='trans'>
      <h2>Transactions Table <br /><select value={selectedMonth} onChange={handleMonthChange}>
      <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">Mars</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select></h2>
      
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date of Sale</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTransactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.title}</td>
              <td>{transaction.dateOfSale}</td>
              <td>{transaction.price}</td>
            </tr>
          ))}
        </tbody>
        <div className="pagination-main">
        <button className="pagination" onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous 
        </button>
        <button
        className="pagination"
          onClick={handleNextPage}
          disabled={endIndex >= transactions.length}
        >
          Next 
        </button>
      </div>
      </table>
      
    </div>
  );
}

export default TransactionsTable;
