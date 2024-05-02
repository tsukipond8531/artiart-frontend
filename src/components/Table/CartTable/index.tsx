"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Para14, Para16 } from 'components/Common/Paragraph'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { MdDeleteOutline } from 'react-icons/md'
import Link from 'next/link'
import Button from 'components/Common/Button'
import { Modal } from 'antd'

const CartTable: React.FC = () => {
    const [cartproduct, setCartProduct]= useState<any[]>([]);
    console.log(cartproduct);
    const [counts, setCounts] = useState<number[]>([]);
    const [subtotal, setSubtotal] = useState<number>(0);

    useEffect(() => {
        if(localStorage.getItem("cart")){
            const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
            setCartProduct(cartItems);
            setCounts(cartItems.map((item: any) => item.count)); // Initialize counts based on cart items
            const sub = cartItems.reduce((total: number, item: any) => total + item.totalPrice, 0);
            setSubtotal(sub);
        }
    },[]);

    const increment = (index: number) => {
        const newCounts = [...counts];
        newCounts[index] += 1;
        setCounts(newCounts);
        updateTotalPrice(index, newCounts[index]);
    };

    const decrement = (index: number) => {
        if (counts[index] > 1) {
            const newCounts = [...counts];
            newCounts[index] -= 1;
            setCounts(newCounts);
            updateTotalPrice(index, newCounts[index]);
        }
    };

    const updateTotalPrice = (index: number, newCount: number) => {
        const updatedCart = [...cartproduct];
        updatedCart[index].count = newCount;
        updatedCart[index].totalPrice = updatedCart[index].price * newCount;
        setCartProduct(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        const sub = updatedCart.reduce((total: number, item: any) => total + item.totalPrice, 0);
        setSubtotal(sub);
    };
    const removeItemFromCart = (index: number) => {
        Modal.confirm({
            title: 'Confirm',
            icon: null,
            content: 'Are you sure you want to remove this item from your cart?',
            okText: 'Yes',
            cancelText: 'No',
            onOk() {
                const updatedCart = [...cartproduct];
                updatedCart.splice(index, 1); // Remove the item at the specified index
                setCartProduct(updatedCart); // Update the state
                localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update local storage
                // Optionally, update subtotal if needed
            },
            onCancel() {
                // Do nothing
            },
        });
    };

    return (
        <>
            <div className="flex flex-col mt-10 md:mt-20">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-start text-[12px] font-normal text-gray-500 uppercase">PRODUCT</th>
                                        <th scope="col" className="px-6 py-3 text-start text-[12px] font-normal text-gray-500 uppercase">QUANTITY</th>
                                        <th scope="col" className="px-6 py-3 text-start text-[12px] font-normal text-gray-500 uppercase">TOTAL</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {cartproduct.map((array: any, index: number) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className='flex items-center gap-2 sm:gap-3 md:gap-4'>
                                                <Image className='rounded-md' src={array.imageUrl[0].imageUrl} width={150} height={150} alt='cart image'/>
                                                <div className='space-y-2'>
                                                    <Para14 className='hover:underline transition duration-200' title={array.name}/> 
                                                    <Para14 icon={"Dhs. "} title={array.price}/>
                                                    <Para14 icon={"Color: "} title={array.color}/>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className='flex gap-2 justify-center items-center'>
                                                <div className='border-2 p-2 flex justify-center items-center gap-1 w-28'>
                                                    <FiMinus className='cursor-pointer' size={20} onClick={() => decrement(index)} />
                                                    <input className='w-14 hover:border hover:scale-105 text-center' type="text" value={counts[index]} readOnly />
                                                    <FiPlus className='cursor-pointer' size={20} onClick={() => increment(index)} />
                                                </div>
                                                <MdDeleteOutline onClick={() => removeItemFromCart(index)} className='cursor-pointer' size={20} />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm"><Para14 icon={"Dhs. "} title={array.totalPrice}/></td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className='text-end  border-t-2 mt-10 pt-5 space-y-2'>
                     <div className='flex gap-5 justify-end items-center'>
                        <Para16 className='poppins-thin' title={"Subtotal"}/>
                        <Para16 className='font-normal' icon="Dhs. " title={subtotal} endicon=" AED"/>
                    </div>
                    <p className='text-[12px]'>Tax included. <Link className='underline' href={"/policy"}>Shipping</Link> calculated at checkout.</p>
                    <Link href={"/checkout"}>
                        <Button className='bg-black text-white w-80 p-3 mt-3' title={"Check out"}/>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default CartTable;
