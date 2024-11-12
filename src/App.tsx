// src/App.tsx
import { useState } from 'react';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import { CartItem } from './types/CartItem';
import Product from './components/Product';
function App() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };
  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8">
        <Product addToCart={addToCart} />
        <Cart cart={cart} setCart={setCart} />
      </div>
    </div>
  );
}

export default App;
