import * as Yup from 'yup';
import {Product, Category} from 'types/interfaces'


export const inputFields = [
    { name: "name", type: 'text' },
    { name: "description", type: 'text' },
    { name: "price", type: 'number' },
    { name: "discountPrice", type: 'number' },
  ];
  export const withoutVariation = [
    { name: "Quantity", type: 'number' },
  ];

  export const Variation = [
    { name: "Variation Name", type: 'text' },
    { name: "Quantity", type: 'number' },
  ];


  export const CategorinputFields = [
    { name: "name", type: 'text' },

  ];



  export const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    price: Yup.string().required('Required'),
    category: Yup.string().required('Required'),
  });


  export const loginValidationSchema = Yup.object({
    name: Yup.string().required('Required'),
    password: Yup.string().required('Required'),

  });

  export const categoryValidationSchema = Yup.object({
    name: Yup.string().required('Required'),

  });

  

 export const initialValues: Product = {
    name: '',
    description: '',
    price: '',
    colors: [],
    totalStockQuantity: 0,
    variantStockQuantities:[],
    modelDetails: [],
    spacification: [],
    discountPrice: '',
    category: '' 
  };

  export const categoryInitialValues: Category = {
    name: ''
  };

  
 export const loginInitialValue = {
  name: '',
  password:'' 
};



export  const generateSlug = (text:string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')      
    .replace(/[^\w\-]+/g, '') 
    .replace(/\-\-+/g, '-'); 
};