'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Hoodiese = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3000/getproducts');
        const result = await res.json();
        console.log(result); // Log the fetched data structure to understand it better

        // Assuming result is { tshirts: [...] }
        if (result.tshirts && result.tshirts.length > 0) {
          setData(Object.values(result.tshirts[0])); // Access the first element of the tshirts array and convert its values to an array
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data.');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data.length) {
    return <div>Loading...</div>;
  }

  return (
    <section className="text-gray-600 body-font flex justify-center">
      <div className="container px-5 py-24 mx-auto flex justify-center">
        <div className="flex-wrap -m-4 flex justify-center">
          {data.map((product) => {
            if (product.category !== 'Hoodiese') return null;
            return (
              <div key={product._id} className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg mx-2">
                {isMounted && (
                  <Link href={`/product/${product.slug}`} className="object-contain">
                    <div className="flex justify-center relative h-48 rounded overflow-hidden shadow-lg">
                      <img
                        alt="ecommerce"
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
                        <div className=''>
                          {product.sizes.includes('S') && <span className='border border-gray-600 px-1 mx-1'>S</span>}
                          {product.sizes.includes('M') && <span className='border border-gray-600 px-1 mx-1'>M</span>}
                          {product.sizes.includes('L') && <span className='border border-gray-600 px-1 mx-1'>L</span>}
                          {product.sizes.includes('XL') && <span className='border border-gray-600 px-1 mx-1'>XL</span>}
                          {product.sizes.includes('XXL') && <span className='border border-gray-600 px-1 mx-1'>XXL</span>}
                        </div>
                      </p>
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hoodiese;
