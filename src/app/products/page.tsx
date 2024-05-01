"use client"
import Container from "components/Common/Container";


import ProductCard from "components/Common/ProductCard";
import Footer from "components/layout/Footer";
import Navbar from "components/layout/Header/Navbar";
import Popoverlist from "components/Common/Popover";
import { Para14 } from "components/Common/Paragraph";
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import Input from "components/Common/Input";
import Drawerfilter from "components/Common/Drawer";
import { IoFilter } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";


export default function Products() {
  const onChange: CheckboxProps['onChange'] = (e) => {
  console.log(`checked = ${e.target.checked}`);
};
  return (
    <>
    <Navbar/>
      <Container>

          <h3 className="text-xl font-bold mt-10 mb-20">Artiart</h3>
          {/* filter container */}
          <div>
  <div className="hidden md:block">
    <div className="flex justify-between flex-wrap mb-10">
      <div className="flex gap-10 border-sky-2">
        <p>Filter :</p>
        <Popoverlist
          title="Availability"
          content={
            <div className="space-y-3">
              <div className="p-2 flex justify-between items-center border-b-2">
                <Para14 endicon={" selected"} title={"0"} />
                <div className="underline cursor-pointer">Reset</div>
              </div>
              <div>
                <Checkbox onChange={onChange}><Para14 title={"In stock "} endicon={""}/></Checkbox>
              </div>
              <div>
                <Checkbox onChange={onChange}><Para14 title={"Out of Stock"} endicon={""}/></Checkbox>
              </div>
            </div>
          }
        />
        <Popoverlist
          title="Price"
          content={
            <div className="space-y-3">
              <div className="p-2 flex justify-between items-center border-b-2">
                <Para14 endicon={"200.00"} title={" The highest price is Dhs. "} />
                <div className="underline cursor-pointer">Reset</div>
              </div>
              <div className="flex gap-2">
                <Input type='number' name='From' placeholder='Enter Price' label='From'/>
                <Input type='number' name='To' placeholder='Enter Price' label='To'/>
              </div>
            </div>
          }
        />
      </div>
      <div className="flex justify-between gap-10">
        <p>Sort by:</p>
        <select className="md:w-28 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none">
          <option selected>Feature</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
        <div className="">20 products</div>
      </div>
    </div>
  </div>
  <div className="md:hidden  mb-4">
    <div className="flex justify-between items-center">
    <Drawerfilter  icon={<IoFilter size={20} />} title="Filter and sort" footer={<>
    <div className="flex justify-between flex-wrap ga-2">
    <button className="underline">Remove All</button>
    <button className="bg-black h-12 text-white px-10 ">Apply</button>
    </div>

    </>}  DrawerContent={<>

      <Drawerfilter className=" " title="Availabillity" endicon={<FaArrowRightLong size={20} />} DrawerContent={<>
       <div className="space-y-3">
              <div className="p-2 flex justify-between items-center border-b-2">
                <Para14 endicon={" selected"} title={"0"} />
                <div className="underline cursor-pointer">Reset</div>
              </div>
              <div>
                <Checkbox onChange={onChange}><Para14 title={"In stock "} endicon={""}/></Checkbox>
              </div>
              <div>
                <Checkbox onChange={onChange}><Para14 title={"Out of Stock"} endicon={""}/></Checkbox>
              </div>
            </div>
      </>}/>

      <Drawerfilter className="mt-3" title="Price" endicon={<FaArrowRightLong size={20} />} DrawerContent={<>
        <div className="space-y-3">
              <div className="p-2 flex justify-between items-center border-b-2">
                <Para14 endicon={"200.00"} title={" The highest price is Dhs. "} />
                <div className="underline cursor-pointer">Reset</div>
              </div>
              <div className="flex gap-2">
                <Input type='number' name='From' placeholder='Enter Price' label='From'/>
                <Input type='number' name='To' placeholder='Enter Price' label='To'/>
              </div>
            </div>
      </>}/>
      <div className="mt-3 flex justify-between">
        <p className="underline text-[18px] ">Sort by:</p>
        <select className="w-24 h-8 block   rounded-lg ring-0 overflow-hidden border-none  disabled:opacity-50 disabled:pointer-events-none">
          <option selected>Feature</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
      </div>


      </>} />
      <Para14 className="space-x-2 gap-2" title={" 20 "} icon={" Prosucts"}/>
    </div>

  </div>
</div>




      </Container>
      <Footer/>
    </>
  );
}
