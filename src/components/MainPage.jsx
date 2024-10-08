import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from './Menu';
import OrderList from './OrderList';
import ThemeToggle from './Toggle';
import './styles.css';
import { FaShoppingCart } from 'react-icons/fa'; // Importing a cart icon

const Main = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [order, setOrder] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false); // State for cart visibility

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('https://localhost:7184/api/MenuItems', {
          withCredentials: true  // Include credentials (cookies)
        });
        setMenuItems(response.data);
      } catch (error) {
        console.error("Error fetching the menu items", error);
      }
    };

    fetchMenuItems();
  }, []);

  const addToOrder = (item) => {
    const existingItem = order.find(orderItem => orderItem.id === item.id);
    if (existingItem) {
      setOrder(order.map(orderItem =>
        orderItem.id === item.id
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      ));
    } else {
      setOrder([...order, { ...item, quantity: 1 }]);
    }
  };

  const increaseQuantity = (id) => {
    setOrder(order.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  };

  const decreaseQuantity = (id) => {
    setOrder(order.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ).filter(item => item.quantity > 0));
  };

  const removeItem = (id) => {
    setOrder(order.filter(item => item.id !== id));
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  return (
    <div className={isDarkMode ? 'app dark-mode' : 'app'}>
      <div className="container">
        <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        
        <div className="row">
          <div className="col-md-8">
            <Menu items={menuItems} addToOrder={addToOrder} />
          </div>
          <div className="col-md-4">
            <div className="cart-icon" onClick={toggleCartVisibility} style={{ cursor: 'pointer' }}>
              <FaShoppingCart size={30} />
              <span className="cart-count">{order.length}</span>
            </div>
            {isCartVisible && (
              <OrderList 
                order={order} 
                increaseQuantity={increaseQuantity} 
                decreaseQuantity={decreaseQuantity} 
                removeItem={removeItem} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
