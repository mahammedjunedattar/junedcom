import React from 'react'

const page = () => {
  return (
    <div>
      <div class="container mx-auto px-4 sm:px-8">
  <div class="py-8">
    <div class="flex justify-between mb-4">
      <h2 class="text-2xl font-semibold leading-tight">Orders</h2>
      <button class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none">Add New Order</button>
    </div>
    <div class="min-w-full shadow-md overflow-hidden border-b border-gray-200 rounded-lg">
      <table class="min-w-full leading-normal">
        <thead>
          <tr>
            <th scope="col" class="px-5 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Order ID
            </th>
            <th scope="col" class="px-5 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Customer
            </th>
            <th scope="col" class="px-5 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Date
            </th>
            <th scope="col" class="px-5 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" class="px-5 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Total
            </th>
            <th scope="col" class="px-5 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <p class="text-gray-900 whitespace-no-wrap">#123456</p>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <p class="text-gray-900 whitespace-no-wrap">John Doe</p>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <p class="text-gray-900 whitespace-no-wrap">2024-08-08</p>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                <span aria-hidden class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                <span class="relative">Completed</span>
              </span>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <p class="text-gray-900 whitespace-no-wrap">$123.45</p>
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              <a href="#" class="text-indigo-600 hover:text-indigo-900 mr-4">Edit</a>
              <a href="#" class="text-red-600 hover:text-red-900">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

    </div>
  )
}

export default page
