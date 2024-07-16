import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import "./Table.css";

const Table = () => {
  const getDataFromLS = () => {
    const data = localStorage.getItem('formEntries');
    return data ? JSON.parse(data) : [];
  };

  const [tableData, setTableData] = useState(getDataFromLS());

  useEffect(() => {
    const handleStorageChange = () => {
      setTableData(getDataFromLS());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleDelete=(id)=>{
    const updateData = tableData.filter(entry => entry.id !== id);
    localStorage.setItem('formEntries', JSON.stringify(updateData));
    setTableData(updateData)

  }


  return (
    <div className='table-container'>
      <Link to="/"><button className='add-button'>Add New Data</button></Link>    

      {tableData.length > 0 && (
        <table className='data-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Phone Number</th>
              <th>Country</th>
              <th>State</th>
              <th>City</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.name}</td>
                <td>{entry.email}</td>
                <td>{entry.radio}</td>
                <td>{entry.phone}</td>
                <td>{entry.country}</td>
                <td>{entry.state}</td>
                <td>{entry.city}</td>
                <td>{entry.address}</td>
                <td><button onClick={() => handleDelete(entry.id)}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
