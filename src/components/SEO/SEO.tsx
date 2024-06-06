// pages/index.tsx
import SeoTable from 'components/Table/SeoTable/SeoTable';
import React from 'react';
// import ResponsiveTable from '../components/ResponsiveTable';

const SEO: React.FC = () => {
  return (
    <div className="bg-gray-100 shadow-xl text-white flex items-center justify-center">
      <SeoTable />
    </div>
  );
};

export default SEO;