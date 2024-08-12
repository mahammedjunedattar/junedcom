import React from 'react'

const page = () => {
  
  
  return (
    <div>
      <section class="text-gray-600 body-font overflow-hidden">
  <div class="container px-5 py-24 mx-auto">
    <div class="lg:w-4/5 mx-auto flex flex-wrap">
      <div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <h2 class="text-sm title-font text-gray-500 tracking-widest">CODESWEAR.COM</h2>
        <h1 class="text-gray-900 text-3xl title-font font-medium mb-4">Order id :#89777</h1>
        <div>your order has been successefully delivered</div>
        <div class="flex mb-4">
          <a class="flex-grow text-center  text-pink-500 border-b-2 border-pink-500 py-2 text-lg px-1">item Description</a>
          <a class="flex-grow text-center border-b-2 border-gray-300 py-2 text-lg px-1">Quantity</a>
          <a class="flex-grow text-center border-b-2 border-gray-300 py-2 text-lg px-1">item total</a>
        </div>
        <div class="flex border-t border-gray-200 py-2 justify-between ">
          <span class="text-gray-500">wear the code (xl/black)</span>
          <span class="text-gray-500 mr-16">1</span>
          <span class="text-gray-500 mr-10"> ₹ 499</span>
        </div>
        <div class="flex border-t border-gray-200 py-2 justify-between">
          <span class="text-gray-500">wear the code (xl/black)</span>
          <span class="text-gray-500 mr-16">1</span>
          <span class="text-gray-500 mr-10"> ₹ 499</span>

        </div>
        <div class="flex border-t border-b mb-6 border-gray-200 py-2 justify-between">
        <span class="text-gray-500">wear the code (xl/black)</span>
        <span class="text-gray-500 mr-16">1</span>
        <span class="text-gray-500 mr-10"> ₹ 499</span>
        </div>
        <div class="flex flex-col">
          <span class="title-font font-medium text-2xl text-gray-900">subtotal : $58.00</span>
          <button class="flex w-36 my-3 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Track order</button>
          <button class="rounded-full w-10 h-10 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
          </button>
        </div>
      </div>
      <img alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400"/>
    </div>
  </div>
</section>
      
    </div>
  )
}

export default page
