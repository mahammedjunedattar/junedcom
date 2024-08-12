'use client'
import React from 'react'
import Link from 'next/link'
import { CiShoppingCart } from "react-icons/ci";
import { AiFillCloseCircle,AiFillPlusCircle  ,AiFillMinusCircle   } from "react-icons/ai";
import { useContext } from 'react';
import Ecomcontext from '@/app/ontext';
import { useState } from 'react';
import { useEffect } from 'react';
import Head from 'next/head'
import Script from 'next/script'
const page = () => {
  let context = useContext(Ecomcontext)
  let {cart,clearcart,removeCart,addToCart,subtotal} = context

  

  return (
    <>
    <Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"/></Head>
    <Script type="application/javascript" src={`{process.env.PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.PAYTM_MID}.js`} onload="onScriptLoad();" crossorigin="anonymous"/>

    <h2 className='font-semibold text-center'>Checkout</h2>

    <div className='container flex flex-col justify-center'>
      <h2 className='mx-16'>1. Delevery Details</h2>

      <div class=" mb-4 flex justify-center space-x-6">
        <div>

      <label htmlfor="Name" class="leading-7 text-sm text-gray-600">Name</label>
      <br />
      <input type="Name" id="Name" name="Name" class="w-[40vw] bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
        <div>

      <label htmlfor="email" class="leading-7 text-sm text-gray-600">Email</label>
      <br />
      <input type="email" id="email" name="email" class="w-[40vw] bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>

      </div>
      <div className='m-auto'>
        <label htmlhtmlfor="Address">Address</label>
        <br />
        <textarea className='border-slate-200 border-2 w-[82vw]' name="Address" id="Address"  rows="2"></textarea>
      </div>
            <div class=" mb-4 flex justify-center space-x-6">
        <div>

      <label htmlfor="phone" class="leading-7 text-sm text-gray-600">phone</label>
      <br />
      <input type="phone" id="phone" name="phone" class="w-[40vw] bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
        <div>

      <label htmlfor="city" class="leading-7 text-sm text-gray-600">city</label>
      <br />
      <input type="city" id="city" name="city" class="w-[40vw] bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>

      </div>
            <div class=" mb-4 flex justify-center space-x-6">
        <div>

      <label htmlfor="state" class="leading-7 text-sm text-gray-600">state</label>
      <br />
      <input type="state" id="state" name="state" class="w-[40vw] bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
        <div>

      <label htmlfor="pincode" class="leading-7 text-sm text-gray-600">pincode</label>
      <br />
      <input type="email" id="email" name="email" class="w-[40vw] bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>

      </div>

      <h2 className='mx-16'>2. Rewiew carts</h2>
      <div className='   z-50 w-64'>
        <div id='3'  className="  z-30 sidebar h-[40vh] w-[50vw] md:w-[20vw]   py-10 px-8 ">

            <ul className=' flex flex-col gap-6'>
    {cart.length === 0 ? (
        <div>No carts to display</div>
    ) : (
        cart.map((item, index) => (

            <li key={index}>
                <div className="item flex justify-center items-center">
                    <div className='w-2/3  '>{item.name}</div>
                    <div className='w-1/3 flex items-center justify-center cursor-pointer text-pink-500'>
                        <AiFillPlusCircle className='mx-1 text-xl' onClick={()=>{addToCart(item.itemCode,1)}}/>
                        <div className='text-black'>{item.qty}</div>
                        <AiFillMinusCircle className='mx-1 text-xl' onClick={()=>{removeCart(item.itemCode,1)}}/>
                    </div>
                </div>
            </li>
        ))
    )}
</ul>

<div>
  subtotal :{subtotal}
</div>
<span>           <Link href={'/order'}>
 <button className='bg-pink-500 px-4 py-2 text-xs text-white rounded hover:bg-pink-600'>pay:{subtotal}</button>
 </Link>
</span>
        </div>

    </div>

    </div>
    </>

  )
}

export default page
