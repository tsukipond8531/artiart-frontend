import React from 'react';
import { Tabs } from 'antd';

const ProductTabs = ({ product }: any) => {
  console.log('Products tabs');
  console.log(product);

  return (
    <Tabs
      defaultActiveKey="1"
      centered
      items={new Array(3).fill(null).map((_, i) => {
        const id = String(i + 1);
        return {
          label: `Tab ${id}`,
          key: id,
          children: `
          
          
          
          `,
        };
      })}
    />
  );
};

export default ProductTabs;
