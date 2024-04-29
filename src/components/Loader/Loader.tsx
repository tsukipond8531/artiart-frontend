'use client'
import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const Loader: React.FC = () => <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: "#000" }} spin />} />;

export default Loader;