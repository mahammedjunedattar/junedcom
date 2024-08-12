import product from "../models/product";
import connectDB from "../middleware/mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connectDB();

  const products = await product.find();

  let Hoodiese = [{}];

  for (const item of products) {
    // Construct a unique key by combining the title with other attributes
    let uniqueKey = `${item.title}-${item.color}-${item.size}`;
    
    if (uniqueKey in Hoodiese[0]) {
      if (!Hoodiese[0][uniqueKey].color.includes(item.color) && item.availableQty > 0) {
        Hoodiese[0][uniqueKey].color.push(item.color);
      }
      if (!Hoodiese[uniqueKey].size.includes(item.size) && item.availWableQty > 0) {
        Hoodiese[0][uniqueKey].size.push(item.size);
      }
    } else {
      Hoodiese[0][uniqueKey] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        Hoodiese[0][uniqueKey].color = [item.color];
        Hoodiese[0][uniqueKey].size = [item.size];
      }
    }
  }

  return NextResponse.json({Hoodiese});
}
