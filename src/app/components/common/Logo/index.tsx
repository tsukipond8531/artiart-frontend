import Link from 'next/link';
import React from 'react';
import logo from "../../../../public/assets/images/logo.png";
import Image from "next/image";
import { HeadingH3, HeadingH4 } from '../Heading';

const Logo:React.FC = () => {
  return (
    <Link  href="/">
      <HeadingH4 className={`text-black`} title={'artiartuae'}/>
    </Link>
  );
};

export default Logo;