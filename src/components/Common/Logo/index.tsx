import Link from 'next/link';
import React from 'react';
import { HeadingH3, HeadingH4 } from '../Heading';
import Image from 'next/image';
import logo from "../../../../public/assets/images/logo.jpeg"
const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <Link className={className} href="/">
      <Image width={120} height={80} src={logo} alt='logo'/>
    </Link>
  );
};

export default Logo;