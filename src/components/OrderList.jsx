import React from 'react';

const OrderList = ({ order, increaseQuantity, decreaseQuantity, removeItem }) => {
  const totalPrice = order.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <div className="order-list">
      <h2>Your Order</h2>
      <ul className="list-group mb-3">
        {order.map((item) => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5>{item.name}</h5>
              <p>Quantity: {item.quantity}</p>
              <div>
                <button className="btn btn-secondary btn-sm" onClick={() => increaseQuantity(item.id)}>+</button>
                <button className="btn btn-secondary btn-sm mx-2" onClick={() => decreaseQuantity(item.id)}>-</button>
                <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            </div>
            <span>Kr {(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <h4>Total: {totalPrice.toFixed(2)} Kr</h4>
    </div>
  );
};

export default OrderList;
