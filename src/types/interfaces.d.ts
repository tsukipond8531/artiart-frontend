export interface PRODUCTCARDPROPS {
  ImgUrl: string,
  title: string,
  strikThroughPrice: string,
  price: string
}



export interface Product {
  name: string;
  description: string;
  price: string;
  category: string;
  colors: { colorName: string }[];
  modelDetails: { name: string; detail: string }[]; // Array of objects with name and email properties
  spacification: { specsDetails: string }[];
  discountPrice: string;
  category: string
}

export interface Category {
  name: string;

}
