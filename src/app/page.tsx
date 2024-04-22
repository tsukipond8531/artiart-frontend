import CategorySlider from "components/Carousel/Category";
import MainSlider from "components/Carousel/MainSlider";
import Product from "components/Home/Product";
import tra1 from "../../public/assets/images/tra1.jpg"
import tra2 from "../../public/assets/images/tra2.jpg"
interface Category {
  id: number;
  name: string;
  image: any;
}
export default function Home() {
  const categories: Category[] = [
    { id: 1, name: 'Category 1', image: tra1 },
    { id: 2, name: 'Category 2', image: tra2 },
    { id: 1, name: 'Category 1', image: tra1 },
    { id: 2, name: 'Category 2', image: tra2 },
    { id: 1, name: 'Category 1', image: tra1 },
    { id: 2, name: 'Category 2', image: tra2 },
    { id: 1, name: 'Category 1', image: tra1 },
    { id: 2, name: 'Category 2', image: tra2 },
    { id: 1, name: 'Category 1', image: tra1 },
    { id: 2, name: 'Category 2', image: tra2 },
    // Add more categories as needed
  ];
  return (
   <>
   <MainSlider/>
   <CategorySlider
   categories={categories}
   />
   <Product/>
   </>
  );
}
