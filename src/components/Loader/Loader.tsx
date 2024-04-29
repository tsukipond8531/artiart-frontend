import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const Loader: React.FC = () => <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: "#ffff" }} spin />} />;

export default Loader;