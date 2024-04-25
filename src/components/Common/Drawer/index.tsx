import React, { useState } from 'react';
import { Drawer } from 'antd';
import { IoClose, IoFilter } from 'react-icons/io5';

interface DrawerFilterProps {
  DrawerContent?: React.ReactNode; 
  icon ?: any;
  title?: string;
  endicon?: any;
  className?: string; // Making className optional
}

const Drawerfilter: React.FC<DrawerFilterProps> = ({ DrawerContent,icon,title,endicon,className }) => {
  const [open, setOpen] = useState<boolean>(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
    <div className={`flex space-y-5 text-[18px] ${className}`} onClick={showDrawer}>
    <button className={`flex  items-center gap-2 underline `} >
        {icon}{title}
      </button>
      {endicon}
    </div>
     
      <Drawer
        title={<IoClose size={25} className='cursor-pointer' onClick={onClose} />}
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
