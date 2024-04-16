import Link from 'next/link';
import React from 'react';
import logo from "../../../../public/assets/images/logo.png";
import Image from "next/image";
import { HeadingH3 } from '../Heading';

const Logo:React.FC = () => {
  return (
    <Link  href="/" className=''>
      <HeadingH3 className={`text-white dark:text-black w-16 h-16 text-2xl pt-4`} title={'artiartuae'}/>
    </Link>
  );
};

export default Logo;