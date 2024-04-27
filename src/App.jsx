// App.jsx
import React from 'react';
import ProductManagement from './ProductManagement';
import OrderManagement from './OrderManagement';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Order Management System</h1>
      <div>
        <h2>Products</h2>
        <ProductManagement />
      </div>
      <div>
        <h2>Orders</h2>
        <OrderManagement />
      </div>
    </div>
  );
}

export default App;
