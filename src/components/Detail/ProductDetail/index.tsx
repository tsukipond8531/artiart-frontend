import Thumbnail from "components/Carousel/Thumbnail";
import Container from "components/Common/Container";
import { HeadingH3 } from "components/Common/Heading";
import { Para12 } from "components/Common/Paragraph";
import React from "react";

const ProductDetail = () => {
  return (
    <>
      <Container className="mt-10 md:mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-5 border">
          <div className="border">
            <Thumbnail />
          </div>
          <div className="border p-2 sm:p-4 md:p-8 max-w-screen-sm">
            <Para12 title={"ARTIART INDIA"}/>
            <HeadingH3 title={"ANTELOPE TRAVEL BOTTLE (GYM, OUTDOORS)"}/>
            </div>
        </div>
      </Container>
    </>
  );
};

export default ProductDetail;
