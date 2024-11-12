// src/components/Cart.tsx
import React from 'react';
import { CartItem } from '../types/CartItem';

interface CartProps {
    cart: CartItem[];
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const Cart: React.FC<CartProps> = ({ cart, setCart }) => {
    const getTotalPrice = () => {
        return cart.reduce((total, item) => {
            return total + item.price * item.quantity; // Pastikan hanya ada satu pernyataan return
        }, 0); // Nilai awal untuk total adalah 0
    };

    const removeItem = (id: number) => {
        // FIRTS CHECK ITEM QUANTITY
        const productQuantity = cart.find((item) => item.id === id)?.quantity;
        if(productQuantity && productQuantity > 1) {
            setCart(
                cart.map((item) => {
                    // REDUCE Q
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 };
                    }
                    return item;
                })
            );
            return;
        } else {
            setCart(cart.filter((item) => item.id !== id));

        }
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-md mt-8">
            <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
            {cart.length === 0 ? (
                <p className="text-gray-500">Your cart is empty</p>
            ) : (
                <div>
                    {cart.map((item) => (
                        <div key={item.id} className="flex items-center mb-4 border-b pb-2">
                            <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover mr-4" />
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                <p className="text-gray-600">Rp {item.price.toLocaleString()}</p>
                                <p className="text-gray-600">Qty: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                                <button className="text-red-500 hover:underline" onClick={() => removeItem(item.id)}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="mt-4 text-xl font-bold">
                        Total: Rp {getTotalPrice().toLocaleString()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;