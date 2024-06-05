import React from 'react';
import { Form, Col, Select } from 'antd';

const { Option } = Select;

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};
interface Options{
  title?: string;
}
interface SelectInputProps {
  placeholder: string;
  selectoption: Options[]
}


const SelectInput: React.FC<SelectInputProps> = ({ placeholder, selectoption }) => (
  <Select
    className='h-[52px]'
    onChange={handleChange}
    placeholder={placeholder}
  >
    {
      selectoption.map((array, index)=>(
      <Option value={array.title} key={index}>{array.title}</Option>
      ))
    }
  </Select>
);
export default SelectInput;