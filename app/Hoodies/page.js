// pages/gethoodiese.js
import React from 'react';

export async function getServerSideProps() {
  try {
    const res = await fetch('http://your-droplet-ip/getproducts');
    const result = await res.json();

    return {
      props: { products: result.tshirts || [] }, // Pass products as props
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: { products: [] }, // Provide empty array on error
    };
  }
}

const Hoodiese = ({ products }) => {
  return (
    <section className="text-gray-600 body-font flex justify-center">
      <div className="container px-5 py-24 mx-auto flex justify-center">
        <div className="flex-wrap -m-4 flex justify-center">
          {products
            .filter(product => product.category === 'Hoodiese')
            .map((product) => (
              <div key={product._id} className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg mx-2">
                <Link href={`/product/${product.slug}`} className="object-contain">
                  <div className="flex justify-center relative h-48 rounded overflow-hidden shadow-lg">
                    <img
                      alt={product.title}
                      className="object-cover object-top w-full h-full flex justify-center"
                      src={product.img}
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-gray-500 text-xs tracking-widest text-center title-font mb-1">
                      {product.category}
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg mx-auto font-medium">
                      {product.title}
                    </h2>
                    <p className="mt-1">₹{product.price}</p>
                    <p className="mt-1">
                      <div>
                        {product.sizes.includes('S') && <span className='border border-gray-600 px-1 mx-1'>S</span>}
                        {product.sizes.includes('M') && <span className='border border-gray-600 px-1 mx-1'>M</span>}
                        {product.sizes.includes('L') && <span className='border border-gray-600 px-1 mx-1'>L</span>}
                        {product.sizes.includes('XL') && <span className='border border-gray-600 px-1 mx-1'>XL</span>}
                        {product.sizes.includes('XXL') && <span className='border border-gray-600 px-1 mx-1'>XXL</span>}
                      </div>
                    </p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Hoodiese;
