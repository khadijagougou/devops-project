import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-important rounded-full border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader;
