import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  if (cart.length === 0) return <p>Your cart is empty. <Link to="/products">Browse products</Link></p>;

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Your Cart</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cart.map((item) => (
          <li key={item._id} style={{ marginBottom: '15px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <strong>{item.name}</strong> - ${item.price}
            <div>
              Quantity: 
              <input 
                type="number" 
                min="1" 
                value={item.quantity} 
                onChange={e => updateQuantity(item._id, parseInt(e.target.value))} 
                style={{ width: '50px', marginLeft: '5px' }}
              />
              <button onClick={() => removeFromCart(item._id)} style={{ marginLeft: '10px' }}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <h3>Total: ${total.toFixed(2)}</h3>
      <Link to="/checkout"><button style={{ marginTop: '10px', padding: '5px 15px' }}>Proceed to Checkout</button></Link>
    </div>
  );
}
