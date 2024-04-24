"use client"
import Container from "components/Common/Container";

import art1 from "../../../public/assets/images/art/art1.png";
import art11 from "../../../public/assets/images/art/art11.jpg";
import art2 from "../../../public/assets/images/art/art2.png";
import art22 from "../../../public/assets/images/art/art22.jpg";
import art3 from "../../../public/assets/images/art/art3.png";
import art33 from "../../../public/assets/images/art/art33.webp";
import art4 from "../../../public/assets/images/art/art4.png";
import art44 from "../../../public/assets/images/art/art44.jpg";
import art5 from "../../../public/assets/images/art/art5.png";
import art55 from "../../../public/assets/images/art/art55.jpg";
import art6 from "../../../public/assets/images/art/art6.png";
import art66 from "../../../public/assets/images/art/art66.jpg";
import art7 from "../../../public/assets/images/art/art7.png";
import art77 from "../../../public/assets/images/art/art77.jpg";
import art8 from "../../../public/assets/images/art/art8.png";
import art88 from "../../../public/assets/images/art/art88.jpg";
import ProductCard from "components/Common/ProductCard";
import Footer from "components/layout/Footer";
import Navbar from "components/layout/Header/Navbar";
import Popoverlist from "components/Common/Popover";
import { Para14 } from "components/Common/Paragraph";
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import Input from "components/Common/Input";


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
    <p>Filter</p>
    <p>Tap here to show filters</p>
  </div>
</div>

          {/* Cards */}

          <ProductCard
        productItems={[
          { image: art1,image2:art11, title: "ANTELOPE TRAVEL BOTTLE (GYM, OUTDOORS)", price: 99, link:"/detail" },
          { image: art2,image2:art22, title: " ARTIST TRAVEL BOTTLE (OUTDOORS)", price: 89, oldPrice: 129,link:"/detail" },
          { image: art3,image2:art33, title: " BUTTERFLY BOTTLE  WITH TEA FILTER (GYM, OUTDOORS)", price: 129,link:"/detail" },
          { image: art4,image2:art44, title: "BUTTERFLY BOTTLE  WITH TEA FILTER (GYM, OUTDOORS)", price: 149,link:"/detail" },
          { image: art5,image2:art55, title: "CLOUD BOTTLE WITH INFUSER (GYM, OUTDOORS)", price: 99, oldPrice: 69,link:"/detail" },
          { image: art6,image2:art66, title: "DEER  TRAVEL CUP (OUTDOORS)", price: 89,link:"/detail" },
          { image: art7,image2:art77, title: "DOCTOR SUCTION MUG (OFFICE)", price: 99, oldPrice: 169,link:"/detail" },
          { image: art8,image2:art88, title: "DUMBO TRAVEL MUG (OUTDOORS)", price: 99,link:"/detail" },
        ]}
        />


      </Container>
      <Footer/>
    </>
  );
}
