// components/AddProductForm.tsx
'use client'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import React, { Component, useEffect, useState } from 'react';
import Uploadfile from 'components/AddProducts/Uploadfile'
import Image from 'next/image';
import axios, { AxiosResponse } from 'axios';



interface Product {
  name: string;
  description: string;
  price: string;
  category: string;
  colors: { colorName: string }[];
  modelDetails: { name: string; detail: string }[]; // Array of objects with name and email properties
  spacification: { specsDetails: string }[];
  discountPrice: string;
}

const AddProductForm = () => {
  const [category, setCategory] = useState<any[]>([])
  const [imagesUrl, setImagesUrl] = useState<any[]>([])

  const initialValues: Product = {
    name: '',
    description: '',
    price: '',
    category: '',
    colors: [{ colorName: "" }],
    modelDetails: [{
      name: '',
      detail: '',
    },
    ],
    spacification: [{ specsDetails: "" }],
    discountPrice: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    price: Yup.string().required('Required'),
    category: Yup.string().required('Required'),
    // imageUrl: Yup.string().required('Required'),
    discountPrice: Yup.string(),
  });

  const onSubmit = async(values: Product) => {
    console.log('function triggered')
    let posterImageUrl= imagesUrl[0]
    console.log(posterImageUrl, "posterimageUrl")
  let newValue = {...values,posterImageUrl,imagesUrl }
  console.log(newValue, "newValue")

  const response= await axios.post('https://artiart-server-phi.vercel.app/api/addProduct', newValue)
  console.log(response, "response")
  };

  const inputFields = [
    { name: "name", type: 'text' },
    { name: "description", type: 'text' },
    { name: "price", type: 'number' },
    { name: "category", type: 'text' },
    { name: "discountPrice", type: 'number' },
  ];

  console.log(imagesUrl, "imagesUrl")
  const useCategoryHandler = async () => {

    const response = await fetch("https://artiart-server-phi.vercel.app/api/getAllcategories");
    const Categories = await response.json();
    setCategory(Categories)

  }


  useEffect(() => {
    useCategoryHandler()
  }, [])


  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

      <Uploadfile setImagesUrl={setImagesUrl} />
      <div>

      </div>
      {imagesUrl && imagesUrl.length > 0 ?
        <div className='flex gap-2 border-3 flex-wrap mt-3 '>
          {imagesUrl.map((item: any, index) => {
            return (
              <Image
                key={index}
                className="cursor-pointer"
                width={30}
                height={30}
                src={item.imageUrl}
                alt={`productImage-${index}`}
              />
            )
          })}

        </div>
        : null
      }

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ values }) => (
          <Form>
            {inputFields.map((inputField, index) => (
              <div key={index} className="mb-4">
                <label className="block text-sm font-medium mb-1">{inputField.name.charAt(0).toLocaleUpperCase() + inputField.name.slice(1)}</label>
                <Field type={inputField.type} name={inputField.name} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                <ErrorMessage name={inputField.name} component="div" className="text-red-500" />
              </div>
            ))}

            {/* <select
        name="colorss"
        value={values.category}
        style={{ display: "block" }}
      >
        <option value="" label="Select a color">
          Select a color{" "}
        </option>
        <option value="red" label="red">
          {" "}
          red
        </option>
        <option value="blue" label="blue">
          blue
        </option>
        
        <option value="green" label="green">
          green
        </option>
      </select> */}

            <div className="mb-4">
              <FieldArray name="modelDetails">
                {({ push, remove }) => (
                  <div>
                    {values.modelDetails.map((model, index) => (
                      <div key={index} className="row mb-4">

                        <div className="col mb-4">
                          <Field type="text" name={`modelDetails[${index}].name`} placeholder="Name" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                          <ErrorMessage name={`modelDetails[${index}].name`} component="div" className="text-red-500" />
                        </div>
                        <div className="col mb-4">
                          <Field type="text" name={`modelDetails[${index}].detail`} placeholder="Detail" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                          <ErrorMessage name={`modelDetails[${index}].detail`} component="div" className="text-red-500" />
                        </div>
                        <div className="col text-red-500">
                          <button type="button" onClick={() => remove(index)}>Remove</button>
                        </div>
                      </div>
                    ))}
                    <button type="button" onClick={() => push({ name: '', detail: '' })}>Add Model Detail</button>
                  </div>
                )}
              </FieldArray>
            </div>


            <div className="mb-4">
              <FieldArray name="colors">
                {({ push, remove }) => (
                  <div>
                    {values.colors.map((model, index) => (
                      <div key={index} className="row mb-4">

                        <div className="col mb-4">
                          <Field type="text" name={`colors[${index}].colorName`} placeholder="colors" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                          <ErrorMessage name={`colors[${index}].colorName`} component="div" className="text-red-500" />
                        </div>
                        <div className="col text-red-500">
                          <button type="button" onClick={() => remove(index)}>Remove</button>
                        </div>
                      </div>
                    ))}
                    <button type="button" onClick={() => push({ colorName: '' })}>Add colors</button>
                  </div>
                )}
              </FieldArray>
            </div>


            <div className="mb-4">
              <FieldArray name="spacification">
                {({ push, remove }) => (
                  <div>
                    {values.spacification.map((model, index) => (
                      <div key={index} className="row mb-4">

                        <div className="col mb-4">
                          <Field type="text" name={`spacification[${index}].specsDetails`} placeholder="Please Spacification" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                          <ErrorMessage name={`spacification[${index}].specsDetails`} component="div" className="text-red-500" />
                        </div>
                        <div className="col text-red-500">
                          <button type="button" onClick={() => remove(index)}>Remove</button>
                        </div>
                      </div>
                    ))}
                    <button type="button" onClick={() => push({ specsDetails: '' })}>Add spacification</button>
                  </div>
                )}
              </FieldArray>
            </div>


            <div className="mb-4">
              <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Add Product</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProductForm;
