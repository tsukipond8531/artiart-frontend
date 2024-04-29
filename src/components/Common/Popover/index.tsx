import React from 'react'
import {  Popover } from 'antd';
import Button from '../Button';
import { MdKeyboardArrowDown } from 'react-icons/md';

const Popoverlist = ({content,title}:any) => {
  return (
  
    <Popover content={content}  trigger="click">
      <button className='p-0 flex gap-2 justify-center items-center'>{title}{<MdKeyboardArrowDown />}</button>
    </Popover>
  )
}

export default Popoverlist