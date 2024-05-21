
"use client";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import React, { useState, useEffect, DragEvent, SetStateAction } from "react";

import Uploadfile from "components/AddProducts/Uploadfile";
import Image from "next/image";
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { Category } from "types/interfaces";
import {
  CategorinputFields,
  categoryInitialValues,
  categoryValidationSchema,
} from "Data/data";
import { RxCross2 } from "react-icons/rx";
import Loader from "components/Loader/Loader";
import { IoMdArrowRoundBack } from "react-icons/io";
import Toaster from "components/Toaster/Toaster";

interface editCategoryNameType {
name: string
}

const AddProductForm = ({setselecteMenu,seteditCategory, editCategory}: any) => {
  const [category, setCategory] = useState<any[]>();
  let CategoryName = editCategory && editCategory.name ? {name: editCategory.name} : null
  let CategorImageUrl = editCategory && editCategory.posterImageUrl  ?  editCategory.posterImageUrl : null

  const [posterimageUrl, setposterimageUrl] = useState<any[] | null>(CategorImageUrl ? [CategorImageUrl]: null);
  const [loading, setloading] = useState<boolean>(false);
  const[editCategoryName, setEditCategoryName] = useState<editCategoryNameType | null | undefined>(CategoryName)


  const onSubmit = async (values: Category, { resetForm }:any) => {
    try {
      setloading(true);
  
      console.log("function triggered");
      let posterImageUrl = posterimageUrl && posterimageUrl[0];
;
      if (!posterImageUrl) throw new Error("Please select relevant Images");
      let newValue = { ...values, posterImageUrl };

      let updateFlag = editCategoryName  ? true : false
      let addProductUrl = updateFlag ? `/api/updateCategory/${editCategory._id} ` : null ;
      let url = `${process.env.NEXT_PUBLIC_BASE_URL}${updateFlag ? addProductUrl : "/api/AddCategory"}`

      const response = await axios.post(url, newValue);
      console.log(response, "response");
      setloading(false);
      Toaster("success", updateFlag ? "Category has been sucessufully updated !" :"Category has been sucessufully Created !");
      updateFlag ?  setselecteMenu("Add Category") : null
      updateFlag ?  seteditCategory(null) : null

      resetForm();
    } catch (err) {
      console.log("error occurred", err);
      setloading(false);

    }
  };
  

  const CategoryHandler = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`
    );
    const Categories = await response.json();
    setCategory(Categories);
  };

  useEffect(() => {
    CategoryHandler();
  }, []);

  const uploadPhotosToBackend = async (files: any[]): Promise<any[]> => {
    const formData = new FormData();
    console.log(files, "files");

    if (files.length < 0) throw new Error("No files found");

    try {
      for (const file of files) {
        formData.append("image", file);
      }

      const response: AxiosResponse<any> = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/addProductImage`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle the response from the backend
      console.log("Response:", response.data.productsImageUrl);
      return response.data?.productsImageUrl;
    } catch (error) {
      // Handle any errors that occur during the request
      console.log("Error:", error);
      // Optionally, you can throw the error to propagate it up to the component level
      throw error;
    }
  };

  const singlehandleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    let file: any = e.dataTransfer.files[0];
    console.log("file", file);

    const files = [file];

    console.log("files", files);
    try {
      let response = await uploadPhotosToBackend(files);
      console.log(response, "response");
      setposterimageUrl(response);

      console.log("Photos uploaded successfully");
    } catch (error) {
      console.error("Failed to upload photos:", error);
    }
  };

  const signlehandleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file: any = e?.target?.files;
    console.log("file", file);
    try {
      if (!file) throw new Error("file not found");
      const response = await uploadPhotosToBackend(file);
      setposterimageUrl(response);
      console.log("Photos uploaded successfully");
    } catch (error) {
      console.error("Failed to upload photos:", error);
    }
  };

  const ImageRemoveHandler = async (
    imagePublicId: string,
    setterFunction: any
  ) => {
    const requestConfig: AxiosRequestConfig = {
      data: { imageUrl: imagePublicId },
    };

    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/removeProductImage`,
        requestConfig
      );
      console.log("Image removed successfully:", response.data);
      setterFunction([]);
    } catch (error) {
      console.error("Failed to remove image:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
            <p className="text-2xl font-black mb-4 flex items-center justify-center gap-2
       hover:bg-gray-200 w-fit p-2 cursor-pointer"  onClick={() =>{setselecteMenu('Add Category')}}> <IoMdArrowRoundBack />  Back</p>
      <h2 className="text-2xl font-black mb-4">Add New Category</h2>
      
      
      <div>
        {posterimageUrl && posterimageUrl.length > 0 ? (
          <div className="flex gap-2 border-3 flex-wrap mb-3  ">
            {posterimageUrl.map((item: any, index) => {
              return (
                <div className="group" key={index}>
                  <div className="flex justify-end invisible group-hover:visible ">
                    <RxCross2
                      className="cursor-pointer"
                      onClick={() => {
                        ImageRemoveHandler(item.public_id, setposterimageUrl);
                      }}
                    />
                  </div>
                  <Image
                    key={index}
                    className="cursor-pointer"
                    width={30}
                    height={30}
                    src={item.imageUrl}
                    alt={`productImage-${index}`}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <>
            <p className="mb-3">Add a poster Image</p>

            <Uploadfile
              setImagesUrl={setposterimageUrl}
              handleFileChange={signlehandleFileChange}
              handleDrop={singlehandleDrop}
            />
          </>
        )}
      </div>

      <Formik
        initialValues={editCategoryName ? editCategoryName:  categoryInitialValues}
        validationSchema={categoryValidationSchema}
        onSubmit={onSubmit}
      >
        {({ values }) => (
          <Form>
            {CategorinputFields.map((inputField, index) => (
              <div key={index} className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  {inputField.name.charAt(0).toLocaleUpperCase() +
                    inputField.name.slice(1)}
                </label>
                <Field
                  type={inputField.type}
                  name={inputField.name}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
                <ErrorMessage
                  name={inputField.name}
                  component="div"
                  className="text-red-500"
                />
              </div>
            ))}

            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                {loading ? <Loader /> : "Add Category " }
                
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProductForm;
