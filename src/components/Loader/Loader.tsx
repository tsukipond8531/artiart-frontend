import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

interface LoaderProps {
  color?: string; // Define color prop
}

const Loader: React.FC<LoaderProps> = ({ color }) => (
  <Spin
    indicator={
      <LoadingOutlined
        style={{ fontSize: 24, color: color ? color : '#000' }}
        spin
      />
    }
  />
);

export default Loader;
