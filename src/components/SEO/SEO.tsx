// pages/index.tsx
import SeoTable from 'components/Table/SeoTable/SeoTable';
import React from 'react';
// import ResponsiveTable from '../components/ResponsiveTable';

const SEO: React.FC = () => {
  return (
    <div className=" text-white flex items-center justify-center">
      <SeoTable />
    </div>
  );
};

export default SEO;