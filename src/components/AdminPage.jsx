import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPage = ({ userRole }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '', image: null });
  const [editingItem, setEditingItem] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false); // State to control form visibility

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('https://localhost:7184/api/MenuItems');
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
        setError('Could not fetch menu items. Please try again later.');
      }
    };
    fetchMenuItems();
  }, []);

  const resetForm = () => {
    setNewItem({ name: '', price: '', image: null });
    setEditingItem(null); // Reset editing state
    setError(''); // Clear any previous errors
    setSuccessMessage(''); // Clear success message
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newItem.name);
    formData.append('price', newItem.price);
    if (newItem.image) {
      formData.append('image', newItem.image);
    }

    try {
      const response = await axios.post('https://localhost:7184/api/MenuItems', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      setMenuItems([...menuItems, response.data]);
      setSuccessMessage('Menu item added successfully!');
      resetForm();
      setIsFormVisible(false); // Hide the form after adding an item
    } catch (error) {
      console.error("Error adding menu item:", error.response ? error.response.data : error.message);
      setError('Failed to add menu item. Please check the details and try again.');
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setNewItem({ ...item, image: null }); // Exclude the image for edit
    setError(''); // Clear any previous errors
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('id', editingItem.id);
    formData.append('name', newItem.name);
    formData.append('price', newItem.price);
    
    // Only append image if a new image is selected
    if (newItem.image) {
      formData.append('image', newItem.image);
      formData.append('imageType', newItem.image.type); // Add image type to the form data
    }

    try {
      const response = await axios.put(
        `https://localhost:7184/api/MenuItems/${editingItem.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );
      setMenuItems(menuItems.map(item => (item.id === editingItem.id ? response.data : item)));
      setSuccessMessage('Menu item updated successfully!');
      resetForm();
    } catch (error) {
      console.error('Error updating menu item:', error);
      setError('Failed to update menu item. Please check the details and try again.');
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      const response = await axios.delete(`https://localhost:7184/api/MenuItems/${id}`, {
        withCredentials: true,
      });

      if (response.status === 200 || response.status === 204) {
        setMenuItems(menuItems.filter(item => item.id !== id));
        setSuccessMessage('Menu item deleted successfully!');
      } else {
        setError('Failed to delete menu item. Please try again.');
      }
    } catch (error) {
      setError('Failed to delete menu item. Please check your network connection.');
    }
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible); // Toggle form visibility
    resetForm(); // Reset form when toggling
  };

  return (
    <div className="content">
      <h1 className="admin-title">Admin Menu Management</h1>
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      
      <button onClick={toggleFormVisibility} className="add-item-button">
        {isFormVisible ? 'Cancel' : 'Add Item'}
      </button>

      {isFormVisible && (
        <form className="admin-form" onSubmit={editingItem ? handleUpdateItem : handleAddItem}>
          <input
            type="text"
            placeholder="Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            required
          />
          
          <input
            type="number"
            placeholder="Price"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            required
          />
          <input 
            type="file" 
            onChange={(e) => setNewItem({ ...newItem, image: e.target.files[0] })} 
          />
          <button type="submit" className="add-button">
            {editingItem ? 'Update Item' : 'Add Item'}
          </button>
        </form>
      )}

      <div className="menu-item-card-container">
        {menuItems.map(item => (
          <div key={item.id} className="menu-item-card">
            <h3 className="menu-item-name">{item.name}</h3>
            <p className="menu-item-price">${item.price}</p>
            {item.image && (
              <img src={`data:image/webp;base64,${item.image}`} alt={item.name} className="menu-item-image" />
            )}
            <div className="menu-item-actions">
              <button onClick={() => handleEditItem(item)} className="edit-button">Edit</button>
              <button onClick={() => handleDeleteItem(item.id)} className="delete-button">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
