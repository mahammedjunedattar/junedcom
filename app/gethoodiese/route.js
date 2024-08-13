// app/api/gethoodiese/route.js
import product from "../../../models/product";
import connectDB from "../../../middleware/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const products = await product.find();

  let Hoodiese = [];

  for (const item of products) {
    let uniqueKey = `${item.title}-${item.color}-${item.size}`;
    
    if (!Hoodiese.find(h => h.key === uniqueKey)) {
      Hoodiese.push({
        key: uniqueKey,
        ...item.toObject(), // Convert Mongoose document to plain object
        color: [item.color],
        size: [item.size]
      });
    } else {
      const existingItem = Hoodiese.find(h => h.key === uniqueKey);
      if (!existingItem.color.includes(item.color) && item.availableQty > 0) {
        existingItem.color.push(item.color);
      }
      if (!existingItem.size.includes(item.size) && item.availableQty > 0) {
        existingItem.size.push(item.size);
      }
    }
  }

  return NextResponse.json({ Hoodiese });
}

