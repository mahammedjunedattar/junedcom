import product from "../models/product";
import connectDB from "../middleware/mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
   await connectDB();
   
   try {
       const products = await request.json();
       
       if (!Array.isArray(products)) {
           return new NextResponse(JSON.stringify({ message: 'Invalid data format. Expected an array of products.' }), { status: 400 });
       }

       for (let i = 0; i < products.length; i++) {
        
       
           let { _id , ...updateFields } = products[i];
           console.log(updateFields)
           const updateproduct = await product.findByIdAndUpdate(_id,updateFields)

       }
       

       return new NextResponse(JSON.stringify({ message: 'Products updated successfully' }), { status: 200 });
   } catch (error) {
       console.error('Error saving products:', error);
       return new NextResponse(JSON.stringify({ message: 'An error occurred while saving products', error: error.message }), { status: 500 });
   }
}
