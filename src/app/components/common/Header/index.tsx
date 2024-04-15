"use client"
import React from 'react';
import Link from 'next/link';
import Container from '../Container';
import { Menu } from 'antd';

export default function Navbar() {
    const dropdownMenu = (
        <Menu>
          <Menu.Item key="0">
            <Link href="/subcategory1">Subcategory 1</Link>
          </Menu.Item>
          <Menu.Item key="1">
            <Link href="/subcategory2">Subcategory 2</Link>
          </Menu.Item>
          {/* ... more items */}
        </Menu>
      );
  return (
    <nav className="bg-gray-100 border p-2">
    <Container className='flex justify-between'>
    <div>
        <h2>artiartuae</h2>
    </div>
    <div className='space-x-5'>
        <Link href={"/"}>Home</Link>
        <Link href={"/"}>Home</Link>
        <Link href={"/"}>Home</Link>
    </div>
    <div>icon</div>
    </Container>
    </nav>
  );
}
