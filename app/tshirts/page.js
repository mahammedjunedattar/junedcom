'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Mugs = () => {
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
          setData(result); // Access the first element of the tshirts array
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

  if (!Object.keys(data).length) {
    return <div>Loading...</div>;
  }

  return (
    <section className="text-gray-600 body-font flex justify-center">
      <div className="container px-5 py-24 mx-auto flex justify-center">
        <div className="flex-wrap -m-4 flex justify-center">
          {Object.keys(data['tshirts'][0]).map((key) => {
            const product = data['tshirts'][0][key];
            console.log(data)
            console.log('mai tsh')
            return (
              <div key={product.id} className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg mx-2">
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
                           { product.sizes['S'] && <span className='border border-gray-600 px-1 mx-1'>s</span>}

                            {product.sizes['M'] && <span className='border border-gray-600 px-1 mx-1'>M</span>}
                            {product.sizes['L'] && <span className='border border-gray-600 px-1 mx-1'>L</span>}
                            {product.sizes['XL'] && <span className='border border-gray-600 px-1 mx-1'>XL</span>}
                            {product.sizes['XXL'] && <span className='border border-gray-600 px-1 mx-1'>XXL</span>}


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

export default Mugs;
