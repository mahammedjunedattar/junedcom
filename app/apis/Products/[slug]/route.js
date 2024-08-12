// app/api/products/[slug]/route.js
import connectDB from '@/app/middleware/mongoose';
import Product from '@/app/models/product';

export async function GET(req, { params }) {
  await connectDB();
  const { slug } = params;
  const product = await Product.findOne({ slug }).lean();
  const variants = await Product.find({ title: product.title });

  let colorsizeslug = {};
  for (const item of variants) {
    if (Object.keys(colorsizeslug).includes(item.color)) {
      colorsizeslug[item.color][item.size] = { slug: item.slug };
    } else {
      colorsizeslug[item.color] = {};
      colorsizeslug[item.color][item.size] = { slug: item.slug };
    }
  }

  return new Response(JSON.stringify({ product, variants: colorsizeslug }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
