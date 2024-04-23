import React from 'react';
import { Form, Col, Select } from 'antd';

const { Option } = Select;

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

interface SelectInputProps {
  placeholder: string;
}

const SelectInput: React.FC<SelectInputProps> = ({ placeholder }) => (
  <Select
    className='h-[52px]'
    onChange={handleChange}
    placeholder={placeholder}
  >
    <Option value='jack'>Jack</Option>
    <Option value='lucy'>Lucy</Option>
    <Option value='Yiminghe'>Yiminghe</Option>
  </Select>
);
export default SelectInput;