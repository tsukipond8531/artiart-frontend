"use client"

import React, { useState } from 'react';
import { Drawer } from 'antd';
import { IoClose, IoFilter } from 'react-icons/io5';

interface DrawerFilterProps {
  DrawerContent?: React.ReactNode; 
  icon ?: any;
  title?: string;
  endicon?: any;
  className?: string; // Making className optional
  footer?: any;
}

const Drawerfilter: React.FC<DrawerFilterProps> = ({ DrawerContent,icon,title,endicon,className,footer }) => {
  const [open, setOpen] = useState<boolean>(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
    <div className={`flex justify-between items-center text-[18px] ${className}`} onClick={showDrawer}>
    <button className={`flex justify-center  items-center gap-2 underline `} >
        {icon}{title}
      </button>
      {endicon}
    </div>
     
      <Drawer
      footer={<>
    <div className="flex justify-between flex-wrap ga-2">
      {/* <button className="underline">Remove All</button> */}
    <button  className="bg-black h-12 text-white px-10 "onClick={onClose}>Apply</button>
    </div>

    </>} 
      width={250}
        title={
          <>
            
            <IoClose onClick={onClose} className='cursor-pointer' size={25} />
          </>
      }
        closable={false}
        onClose={onClose}
        visible={open}
      >
        {DrawerContent}
      </Drawer>
    </>
  );
}

export default Drawerfilter;
