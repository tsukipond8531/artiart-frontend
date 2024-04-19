import Container from "components/Common/Container";
import tra1 from "../../../public/assets/images/tra1.jpg"
import tra2 from "../../../public/assets/images/tra2.jpg"
import tra3 from "../../../public/assets/images/tra3.jpg"
import ProductCard from "components/Common/ProductCard";


export default function Products() {
  return (
    <>
      <Container>

        <div className="w-[92%] m-auto">
          <h3 className="text-xl font-bold mt-10 mb-20">Artiart</h3>
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
          { image: tra1,image2:tra2, title: "asdas", price: 123, oldPrice: 123,link:"/detail" },
          { image: tra2,image2:tra2, title: "asda", price: 12, oldPrice: 123,link:"/detail" },
          { image: tra3,image2:tra2, title: "asd", price: 123, oldPrice: 123,link:"/detail" },
          { image: tra2,image2:tra2, title: "asd", price: 123, oldPrice: 123,link:"/detail" },
          { image: tra1,image2:tra2, title: "asd", price: 123, oldPrice: 123,link:"/detail" },
          { image: tra3,image2:tra2, title: "asd", price: 123, oldPrice: 123,link:"/detail" },
          { image: tra1,image2:tra2, title: "asd", price: 123, oldPrice: 123,link:"/detail" },
        ]}
      />


        </div>



      </Container>
    </>
  );
}
