"use client"
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from 'next/router';
import NProgressBar from '@/components/progressbar';
import Ecomcontext from './ontext';

  // ... Rest of your code ... (remove the `use client` statement)


export default function RootLayout({ children }) {


  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || {};
      const cartArray = Object.values(storedCart);
      setCart(cartArray);
      calculateSubTotal(cartArray);
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }
  }, []);

  const saveCart = (updatedCart) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
    calculateSubTotal(updatedCart);
  };

  const calculateSubTotal = (cartArray) => {
    let subtotal = cartArray.reduce((total, item) => total + item.price * item.qty, 0);
    setSubTotal(subtotal);
  };

  const addToCart = (item) => {
    const existingItemIndex = cart.findIndex(
      (cartItem) =>
        cartItem.itemCode === item.itemCode && cartItem.variant === item.color && cartItem.size === item.size
    );
    toast.success('Item added successfully!', {
      position: 'top-center',
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].qty += item.qty;
      saveCart(updatedCart);
    } else {
      const updatedCart = [...cart, item];
      saveCart(updatedCart);
    }
  };

  const removeFromCart = (itemCode, color, size, qty) => {
    const updatedCart = cart.map((item) =>
      item.itemCode === itemCode && item.variant === color && item.size === size
        ? { ...item, qty: Math.max(item.qty - qty, 0) }
        : item
    );
    const filteredCart = updatedCart.filter((item) => item.qty > 0);
    saveCart(filteredCart);
    toast.warn('Item removed!', {
      position: 'top-center',
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  const clearCart = () => {
    localStorage.removeItem('cart');
    setCart([]);
    setSubTotal(0);
    toast.error('Cart cleared!', {
      position: 'top-center',
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  const loginStatus = (status) => {
    setLogin(status);
  };

  const buyNow = (params, price, title, size, variant) => {
    if (!login) {
      router.push('/login');
    } else {
      const newCart = [{ itemCode: params, qty: 1, price, name: title, size, variant }];
      setCart(newCart);
      saveCart(newCart);
      router.push('/checkout');
    }
  };

  return (
    <html lang="en">
      
      <body>
        <Ecomcontext.Provider
          value={{ subTotal, cart, addToCart, removeFromCart, clearCart, loginStatus, login, buyNow }}
        >
          <Navbar />
          <NProgressBar />

          {children}
          <Footer />
        </Ecomcontext.Provider>
      </body>
    </html>
  );
}
