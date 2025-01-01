import React from 'react';

const MapHeader = () => {
  return (
    <a
      href="https://knokknok.social/"
      target="_blank"
      rel="noopener noreferrer"
      className="absolute top-4 left-4 z-50 md:w-24 w-16 h-auto hover:opacity-80 transition-opacity md:top-4 top-16"
    >
      <img
        src="/lovable-uploads/b050625e-3d9e-4034-98dd-18b568b1327e.png"
        alt="Knok Knok"
        className="w-full h-full object-contain"
      />
    </a>
  );
};

export default MapHeader;