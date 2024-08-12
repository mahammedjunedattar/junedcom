import jjsss from "../models/product";
import connectDB from "../middleware/mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDB();

  try {
    const products = await request.json();

    if (!Array.isArray(products)) {
      return new NextResponse(JSON.stringify({ message: 'Invalid data format. Expected an array of products.' }), { status: 400 });
    }

    let savedProducts = [];
    for (let productData of products) {
      let { title, slug, desc, img, category, price, sizes, colors, availableQty = 0 } = productData;
   console.log(colors)
      // Ensure sizes and colors are valid structures
      if (typeof  sizes !== 'object' || Array.isArray(sizes)) sizes = {};
      if (!Array.isArray(colors)) colors = [];


      // Create a new Product instance
      const product = new jjsss({
        title,
        slug,
        desc,
        img,
        category,
        price,
        availableQty,


        sizes,  // Assuming sizes is an object
        colors,  // Assuming colors is an array of objects
      });

      // Save the product to the database
      let savedProduct = await  product.save();
      savedProducts.push(savedProduct);
    }

    // Return a successful response with saved products
    return new NextResponse(JSON.stringify({ message: 'Products saved successfully', data: savedProducts }), { status: 200 });
  } catch (error) {
    console.error('Error saving products:', error);
    return new NextResponse(JSON.stringify({ message: 'An error occurred while saving products', error: error.message }), { status: 500 });
  }
}
