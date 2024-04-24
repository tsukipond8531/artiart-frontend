"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import tra1 from "../../../../public/assets/images/tra1.jpg"
import { Para14, Para16 } from 'components/Common/Paragraph'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { MdDeleteOutline } from 'react-icons/md'
import Link from 'next/link'
import Button from 'components/Common/Button'

const CartTable: React.FC = () => {
    // Initialize count state for each item
    const [counts, setCounts] = useState<number[]>([1, 1]); // Initial count values for each item
    const pricePerItem = 89.00; // Set the price per item

    const increment = (index: number) => {
        const newCounts = [...counts];
        newCounts[index] += 1;
        setCounts(newCounts);
    };

    const decrement = (index: number) => {
        if (counts[index] > 1) {
            const newCounts = [...counts];
            newCounts[index] -= 1;
            setCounts(newCounts);
        }
    };

    const totalPrice = (index: number) => {
        return (pricePerItem * counts[index]).toFixed(2);
    };

    // Calculate subtotal
    const subtotal = counts.reduce((acc, count, index) => {
        return acc + parseFloat(totalPrice(index));
    }, 0);

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
                                    {counts.map((count, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <div className='flex items-center gap-2 sm:gap-3 md:gap-4'>
                                                    <Image className='rounded-md' src={tra1} width={150} height={150} alt='cart image'/>
                                                    <div className='space-y-2'>
                                                        <Para14 className='hover:underline transition duration-200' title={"ARTIST TRAVEL BOTTLE (OUTDOORS)"}/> 
                                                        <Para14 icon={"Dhs. "} title={pricePerItem.toFixed(2)}/>
                                                        <Para14 icon={"Color: "} title={"DEEP PINK"}/>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <div className='flex gap-2 justify-center items-center'>
                                                    <div className='border-2 p-2 flex justify-center items-center gap-1 w-28'>
                                                        <FiMinus className='cursor-pointer' size={20} onClick={() => decrement(index)} />
                                                        <input className='w-14 hover:border hover:scale-105 text-center' type="text" value={count} readOnly />
                                                        <FiPlus className='cursor-pointer' size={20} onClick={() => increment(index)} />
                                                    </div>
                                                    <MdDeleteOutline className='cursor-pointer' size={20} />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm"><Para14 icon={"Dhs. "} title={totalPrice(index)}/></td>
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
                        <Para16 className='font-normal' icon="Dhs. " title={subtotal.toFixed(2)} endicon=" AED"/>
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
