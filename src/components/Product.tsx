// src/components/Product.tsx
import React from 'react';
import { CartItem } from '../types/CartItem';

interface ProductProps {
    addToCart: (product: CartItem) => void;
}

const Product: React.FC<ProductProps> = ({ addToCart }) => {
    const products: CartItem[] = [
        { id: 1, name: 'Product 1', price: 100000, quantity: 1, imageUrl: 'https://via.placeholder.com/100' },
        { id: 2, name: 'Product 2', price: 150000, quantity: 1, imageUrl: 'https://via.placeholder.com/100' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((product) => (
                <div key={product.id} className="border p-4 rounded-md shadow-md">
                    <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">Rp {product.price.toLocaleString()}</p>
                    <button
                        onClick={() => addToCart(product)}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Add to Cart
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Product;