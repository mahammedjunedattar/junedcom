'use client'
import { useRef, useState, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CiShoppingCart } from "react-icons/ci";
import { AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { MdAccountCircle } from "react-icons/md";
import Ecomcontext from '@/app/ontext';
const Navbar = () => {
  const context = useContext(Ecomcontext);
  const [drop, setDrop] = useState('hidden');
  const [check, setCheck] = useState('block');
  const { cart, clearCart, removeFromCart, addToCart, subTotal } = context;
  const cartRef = useRef(null);
  const navRef = useRef(null);

  const handleCartToggle = () => {
    if (cartRef.current.classList.contains('translate-x-full')) {
      cartRef.current.classList.remove('translate-x-full');
      cartRef.current.classList.add('translate-x-0');
    } else {
      cartRef.current.classList.remove('translate-x-0');
      cartRef.current.classList.add('translate-x-full');
    }
  };

  const handleNavToggle = () => {
    if (navRef.current.classList.contains('absolute')) {
      navRef.current.classList.remove('absolute');
      navRef.current.classList.add('relative');
    } else {
      navRef.current.classList.remove('relative');
      navRef.current.classList.add('absolute');
    }
  };

  const toggleDropdown = () => {
    setDrop(prev => (prev === 'hidden' ? 'block' : 'hidden'));
  };

  return (
    <>
      <div className='flex flex-col md:flex-row justify-center items-center text-sm md:text-base md:justify-between bg-white shadow-lg overflow-hidden sticky top-0 bottom-0 z-30'>
        <div className="logo md:px-3 shadow-lg md:shadow-none md:h-6 w-full m-auto flex justify-center items-center md:justify-start">
          <Link href={'/'}>
            <Image src="/images/logo.png" alt="Logo" width={170} height={40} />
          </Link>
        </div>
        <div className="nav overflow-hidden w-full flex justify-center">
          <ul ref={navRef} className='md:flex items-center md:space-x-6 font-bold text-lg justify-center my-3 transform transition absolute bottom-full md:relative md:top-0'>
            <Link href={'/tshirts'}><li>Tshirts</li></Link>
            <Link href={'/stickers'}><li>Stickers</li></Link>
            <Link href={'/Hoodies'}><li>Hoodies</li></Link>
            <Link href={'/mugs'}><li>Mugs</li></Link>
          </ul>
        </div>
        <div className="cart px-3">
          <div className='absolute right-3 top-1 text-xl md:text-3xl cursor-pointer'>
            <div className='flex flex-row-reverse'>
              <CiShoppingCart className='hidden md:block mx-8 ' onClick={handleCartToggle} />
              <MdAccountCircle onClick={toggleDropdown} className='my-2' />
            </div>
            <div className='space-y-1 my-2 md:hidden' onClick={handleNavToggle}>
              <div className='bg-pink-500 w-5 h-1'></div>
              <div className='bg-pink-500 w-5 h-1'></div>
              <div className='bg-pink-500 w-5 h-1'></div>
            </div>
          </div>
        </div>
      </div>

      <div className='hidden md:block z-50'>
        <div ref={cartRef} className={`z-30 sidebar h-[100vh] absolute top-0 right-0 bg-pink-100 py-10 px-8 transform transition-transform ${cart.length !== 0 ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className='text-lg font-bold text-center'>Shopping Cart</div>
          <span className='absolute top-2 right-2 cursor-pointer text-2xl' onClick={handleCartToggle}><AiFillCloseCircle /></span>

          <ul className='flex flex-col gap-6'>
            {cart.length === 0 ? (
              <div>No items in the cart</div>
            ) : (
              cart.map((item, index) => (
                <li key={index}>
                  <div className="item flex justify-center items-center">
                    <div className='w-2/3'>{item.name} ({item.size}/{item.variant})</div>
                    <div className='w-1/3 flex items-center justify-center cursor-pointer text-pink-500'>
                      <AiFillPlusCircle className='mx-1 text-xl' onClick={() => addToCart({ itemCode: item.itemCode, color: item.variant, size: item.size, qty: 1 })} />
                      <div className='text-black'>{item.qty}</div>
                      <AiFillMinusCircle className='mx-1 text-xl' onClick={() => removeFromCart(item.itemCode, item.variant, item.size, 1)} />
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
          <div className="checkout my-3">
            <Link href={'/checkout'}>
              <button className='bg-pink-500 px-4 py-2 text-xs text-white rounded hover:bg-pink-600'>Checkout</button>
            </Link>
            <button className='bg-pink-500 px-4 py-2 text-xs text-white rounded mx-3 hover:bg-pink-600' onClick={clearCart}>Clear</button>
          </div>
          <span>Subtotal: ₹{subTotal}</span>
        </div>
      </div>

      <div id="dropdownHover" className={`z-10 ml-auto ${drop} sticky top-14 bottom-0 z-30 bg-pink-500 divide-y divide-gray-100 rounded-lg shadow w-44`}>
        <ul className="py-2 text-sm text-white-700 dark:text-white-200" aria-labelledby="dropdownHoverButton">
          <li>
            <Link href={'/login'} className="block px-4 py-2 dark:hover:bg-gray-600 text-white">Login</Link>
          </li>
          <li>
            <Link href={'/Orders'} className="block px-4 py-2 dark:hover:bg-gray-600 text-white">Orders</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
