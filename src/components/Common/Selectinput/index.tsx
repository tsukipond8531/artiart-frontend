import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

interface Options {
  title?: string;
}

interface SelectInputProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (name: string, value: string) => void;
  selectoption: Options[];
}

const SelectInput: React.FC<SelectInputProps> = ({ name, placeholder, value, onChange, selectoption }) => (
  <Select
    className='h-[52px]'
    placeholder={placeholder}
    value={value}
    onChange={(val) => onChange(name, val)}
  >
    {selectoption.map((array, index) => (
      <Option value={array.title} key={index}>{array.title}</Option>
    ))}
  </Select>
);

export default SelectInput;
