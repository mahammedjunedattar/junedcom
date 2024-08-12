// layout.js

// Server-side Code
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Ecomcontext from '../ontext';

export default function RootLayout({ children }) {
  // Variables and functions that can run on both server and client
  return (
    <html lang="en">
      <body>
        <Ecomcontext.Provider value={{ /* provide values that are server-safe */ }}>
          <Navbar />
          {children}
          <Footer />
        </Ecomcontext.Provider>
      </body>
    </html>
  );
}
