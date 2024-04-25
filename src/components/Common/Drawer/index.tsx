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
      footer={footer}
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
