import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <div className='fixed w-full top-0 left-0 border-b'>
      <div className='flex items-center justify-between px-16 py-2 max-w-screen-xl mx-auto gap-4'>
        <div className='flex'>
          <div className='flex flex-col ml-6'>
            <span className='text-gray-800 dark:text-white font-semibold text-lg'>Detectd</span>
            <span className='text-gray-600 dark:text-gray-200'>Surgical Tools</span>
          </div>
        </div>
        <Link to="/" className="hover:text-indigo-600">Home</Link>
      </div>
    </div>
  );
}

export default NavBar;