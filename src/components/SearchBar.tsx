import React from 'react';
import { Input } from './ui/input';

const SearchBar = () => {
  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4 z-10">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search by location or neighborhood..."
          className="w-full h-12 pl-12 pr-4 rounded-full shadow-lg border-2 border-gray-200 focus:border-blue-500"
        />
        <svg
          className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default SearchBar;