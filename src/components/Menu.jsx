import React from 'react';

const Menu = ({ items, addToOrder }) => {
  return (
    <div className="menu">
      <h2>Items</h2>
      <div className="menu-item-card-container">
        {items.map((item) => {
          return (
            <div className="menu-item-card" key={item.id}>
              
                <img
                  src={`https://localhost:7184/api/MenuItems/${item.id}/image`}
                  className="card-img-top menu-item-image" // Use the new class here
                  alt={item.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.price.toFixed(2)} Kr</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => addToOrder(item)}
                  >
                    Add to Order
                  </button>
                
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
