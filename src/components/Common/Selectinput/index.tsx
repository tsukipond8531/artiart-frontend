
'use client'
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

const SelectInput: React.FC<SelectInputProps> = ({ name, placeholder, value, onChange, selectoption }) => {
  console.log(`Rendering SelectInput: name=${name}, value=${value}`);

  return (
    <Select
      className="h-[52px]"
      placeholder={placeholder}
      value={value}
      onChange={(val) => {
        console.log(`Select onChange: name=${name}, val=${val}`);
        onChange(name, val);
      }}
    >
      {selectoption.map((option, index) => (
        <Option value={option.title} key={index}>
          {option.title}
        </Option>
      ))}
    </Select>
  );
};

export default SelectInput;
