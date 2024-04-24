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


export default function Products() {
  return (
    <>
    <Navbar/>
      <Container>

        <div className="w-[92%] m-auto">
          <h3 className="text-xl-h3  mt-10 mb-20">Artiart</h3>
          {/* filter container */}
          <div className="flex justify-between flex-wrap mb-10" >
            <div className="flex gap-10 border-sky-2"  >
              <p>Filter : </p>
              <div>Availability </div>
              <div>Price </div>
            </div>
            <div className="flex justify-end gap-10" > 
              <p>Sort by:</p>
              <div>Best Selling </div>
              <div className="">20 products </div></div>

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


        </div>



      </Container>
      <Footer/>
    </>
  );
}
