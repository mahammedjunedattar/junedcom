'use client';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Ecomcontext from '@/app/ontext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = ({ params }) => {
  const context = useContext(Ecomcontext);
  const { addToCart, buyNow } = context;
  const router = useRouter();
  const [pin, setPin] = useState('');
  const [service, setService] = useState(null);
  const [display, setDisplay] = useState('hidden');
  const [product, setProduct] = useState(null);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');

  useEffect(() => {
    let isMounted = true;
    async function fetchProduct() {
      try {
        const res = await fetch(`/apis/Products/${params.slug}`);
        const data = await res.json();
        if (isMounted) {
          setProduct(data);
          setColor(data.product.colors[0]?.color || '');
          setSize(data.product.colors[0]?.availableQty ? Object.keys(data.product.colors[0].availableQty)[0] : '');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    }
    fetchProduct();
    return () => {
      isMounted = false;
    };
  }, [params.slug]);

  const handleClick = async () => {
    let url = await fetch('/api/pincode');
    let code = await url.json();
    if (code.includes(parseInt(pin))) {
      setService(true);
    } else {
      setService(false);
      setDisplay('block');
    }
  };

  const onChange = (e) => {
    setPin(e.target.value);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const selectedColor = product.product.colors.find(c => c.color === color) || product.product.colors[0];

  const refreshvariant = (colorOption) => {
    setColor(colorOption);
    const selectedSize = size || (selectedColor.availableQty && Object.keys(selectedColor.availableQty)[0]);
    setSize(selectedSize);
    const url = `/product/${params.slug}?color=${colorOption}&size=${selectedSize}`;
    router.push(url, undefined, { shallow: true });
  };

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-1/2 h-44 object-cover object-center rounded"
              src={selectedColor.image}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.product.title} ({size}/{color})</h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  {[...Array(4)].map((_, i) => (
                    <svg
                      key={i}
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-pink-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  ))}
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
              </div>
              <p className="leading-relaxed">{product.product.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  {product.product.colors.map((colorOption, index) => (
                    <input
                      key={`${colorOption.color}-${index}`}
                      type="radio"
                      onClick={() => refreshvariant(colorOption.color)}
                      className={`border-2 ${colorOption.color === 'white' ? 'border-gray-300' : `bg-${colorOption.color}-700`} rounded-full w-6 h-6 focus:outline-none`}
                      name="color"
                    />
                  ))}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select
                      onChange={(e) => setSize(e.target.value)}
                      className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10"
                      value={size}
                    >
                      {selectedColor.availableQty && Object.keys(selectedColor.availableQty).map((sizeOption, index) => (
                        <option key={index} value={sizeOption}>
                          {sizeOption}
                        </option>
                      ))}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <input
                  onChange={onChange}
                  className="px-2 py-2 border-2 border-gray-400 rounded-full"
                  placeholder="Enter your Pincode"
                  type="text"
                />
                <button
                  className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline ml-2"
                  onClick={handleClick}
                >
                  Check
                </button>
              </div>
              <div className="flex my-8 space-x-5">
                <span className="title-font font-medium text-2xl text-gray-900">₹{product.product.price}</span>
                <button className="flex ml-auto rounded-full text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600" onClick={() => buyNow(params.slug, product.product.price, product.product.title, size, color)}>
                  Buy
                </button>
                <button className="flex ml-auto rounded-full text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600" onClick={() => addToCart({ itemCode: params.slug, qty: 1, price: product.product.price, name: product.product.title, size, variant: color })}>
                  Add to Cart
                </button>
              </div>
              {service !== null && (
                <div className={`text-${service ? 'green' : 'red'}-700 mt-2`}>
                  {service ? 'Available' : 'Unavailable'} at your Pincode
                </div>
              )}
              {display === 'block' && (
                <div className="mt-2">
                  <p>Sorry, we are not available at your location</p>
                </div>
              )}
              <ToastContainer />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Product;
