import React, { useState, useEffect } from 'react';
import OrderManagement from './OrderManagement'; // Import OrderManagement component
import ProductManagement from './ProductManagement'; // Import ProductManagement component

function App() {
  // State for products
  const [products, setProducts] = useState([]);
  // State for orders
  const [orders, setOrders] = useState([]);

  // State for new product form
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: ''
  });

  // State for new order form
  const [newOrder, setNewOrder] = useState({
    productId: '',
    quantity: ''
  });

  // Fetch products and orders from the API
  useEffect(() => {
    async function fetchData() {
      try {
        const productsResponse = await fetch('https://api.github.com/repos/JohnKyle29/it-sysarch32-midterm-glabog1/products');
        const productsData = await productsResponse.json();
        setProducts(productsData);

        const ordersResponse = await fetch('https://api.github.com/repos/JohnKyle29/it-sysarch32-midterm-glabog1/orders');
        const ordersData = await ordersResponse.json();
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  // Function to handle input changes in new product form
  const handleProductChange = (event) => {
    const { name, value } = event.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Function to handle input changes in new order form
  const handleOrderChange = (event) => {
    const { name, value } = event.target;
    setNewOrder({ ...newOrder, [name]: value });
  };

  // Function to handle submission of new product form
  const handleProductSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://api.github.com/repos/JohnKyle29/it-sysarch32-midterm-glabog1/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      if (response.ok) {
        // If successful, fetch updated product data
        const updatedProductsResponse = await fetch('https://api.github.com/repos/JohnKyle29/it-sysarch32-midterm-glabog1/products');
        const updatedProductsData = await updatedProductsResponse.json();
        setProducts(updatedProductsData);
        // Clear form fields
        setNewProduct({ name: '', price: '' });
      } else {
        console.error('Failed to add product:', response.status);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  // Function to handle submission of new order form
  const handleOrderSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://api.github.com/repos/JohnKyle29/it-sysarch32-midterm-glabog1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder),
      });
      if (response.ok) {
        // If successful, fetch updated order data
        const updatedOrdersResponse = await fetch('https://api.github.com/repos/JohnKyle29/it-sysarch32-midterm-glabog1/orders');
        const updatedOrdersData = await updatedOrdersResponse.json();
        setOrders(updatedOrdersData);
        // Clear form fields
        setNewOrder({ productId: '', quantity: '' });
      } else {
        console.error('Failed to add order:', response.status);
      }
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };

  // Function to delete a product
  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`https://api.github.com/repos/JohnKyle29/it-sysarch32-midterm-glabog1/products/${productId}`, {
        method: 'DELETE',
      });
     
      if (response.ok) {
        // If successful, fetch updated product data
        const updatedProductsResponse = await fetch('https://api.github.com/repos/JohnKyle29/it-sysarch32-midterm-glabog1/products');
        const updatedProductsData = await updatedProductsResponse.json();
        setProducts(updatedProductsData);
      } else {
        console.error('Failed to delete product:', response.status);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Function to delete an order
  const deleteOrder = async (orderId) => {
    try {
      const response = await fetch(`https://api.github.com/repos/JohnKyle29/it-sysarch32-midterm-glabog1/orders/${orderId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // If successful, fetch updated order data
        const updatedOrdersResponse = await fetch('https://api.github.com/repos/JohnKyle29/it-sysarch32-midterm-glabog1/orders');
        const updatedOrdersData = await updatedOrdersResponse.json();
        setOrders(updatedOrdersData);
      } else {
        console.error('Failed to delete order:', response.status);
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div>
      <h1>Order Management System</h1>
      <div>
        <h2>Products</h2>
        {/* Render ProductManagement component with necessary props */}
        <ProductManagement
          products={products}
          newProduct={newProduct}
          handleProductChange={handleProductChange}
          handleProductSubmit={handleProductSubmit}
          deleteProduct={deleteProduct}
        />
      </div>
      <div>
        <h2>Orders</h2>
        {/* Render OrderManagement component with necessary props */}
        <OrderManagement
          orders={orders}
          newOrder={newOrder}
          handleOrderChange={handleOrderChange}
          handleOrderSubmit={handleOrderSubmit}
          deleteOrder={deleteOrder}
        />
      </div>
    </div>
  );
}

export default App;
