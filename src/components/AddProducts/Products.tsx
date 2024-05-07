"use client";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import React, { useState, useEffect, DragEvent, SetStateAction } from "react";

import Uploadfile from "components/AddProducts/Uploadfile";
import Image from "next/image";
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { Product } from "types/interfaces";
import { inputFields, validationSchema, initialValues } from "Data/data";
import { RxCross2 } from "react-icons/rx";
import { IoMdArrowRoundBack } from "react-icons/io";
import Loader from "components/Loader/Loader";
import Toaster from "components/Toaster/Toaster";



const AddProductForm = ({setselecteMenu}: any) => {
  const [category, setCategory] = useState<any[]>();
  const [imagesUrl, setImagesUrl] = useState<any[]>([]);
  const [selectedFile, setSelectedFiles] = useState<any[] | null>(null);
  const [posterimageUrl, setposterimageUrl] = useState<any[] | null>();
  const [hoverImage, sethoverImage] = useState<any[] | null | undefined>();
  const [loading, setloading] = useState<boolean>(false);

  

  const onSubmit = async (values: Product, { resetForm }: any) => {
    try {
   
      setloading(true)
      let posterImageUrl = posterimageUrl && posterimageUrl[0];
      let hoverImageUrl = hoverImage && hoverImage[0];
let createdAt = Date.now()
      console.log(posterImageUrl, "posterimageUrl");
      if (!posterImageUrl || !hoverImageUrl || !(imagesUrl.length > 0))
        throw new Error("Please select relevant Images");
      let newValue = {
        ...values,
        posterImageUrl,
        imageUrl: imagesUrl,
        hoverImageUrl,
        createdAt
      };
      console.log(newValue, "newValue");

  const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/addProduct`,newValue
      );
      console.log(response, "response");
      Toaster("success", "Product has been sucessufully Created !");

      resetForm();
      setloading(false)

    } catch (err) {
      console.log(err, "err");
      setloading(false)
  
    }
  };


  useEffect(() => {
    const CategoryHandler = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`
      );
      const Categories = await response.json();
      setCategory(Categories);
    };
  
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

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(files);
    console.log("files", files);
    try {
      let response = await uploadPhotosToBackend(files);
      setImagesUrl((prev) => [...prev, ...response]);

      console.log("Photos uploaded successfully");
    } catch (error) {
      console.error("Failed to upload photos:", error);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files;
    console.log("file", file);
    setSelectedFiles(file);
    try {
      const response = await uploadPhotosToBackend(file);
      setImagesUrl((prev) => [...prev, ...response]);
      console.log("Photos uploaded successfully");
    } catch (error) {
      console.error("Failed to upload photos:", error);
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

  const HoversinglehandleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    let file: any = e.dataTransfer.files[0];
    const files = [file];

    console.log("files", files);
    try {
      let response = await uploadPhotosToBackend(files);
      console.log(response, "response");
      sethoverImage(response);

      console.log("Photos uploaded successfully");
    } catch (error) {
      console.error("Failed to upload photos:", error);
    }
  };

  const HoversignlehandleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("function triggered");
    const file: any = e.target.files;
    // const files = Array.from(file);
    console.log("file", file);
    try {
      if (!file) throw new Error("file not found");

      const response = await uploadPhotosToBackend(file);
      sethoverImage(response);
      console.log("Photos uploaded successfully");
    } catch (error) {
      console.log("Failed to upload photos:", error);
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

  const ImageRemoved = async (imagePublicId: string, setterFunction: any) => {
    const requestConfig: AxiosRequestConfig = {
      data: { imageUrl: imagePublicId },
    };

    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/removeProductImage`,
        requestConfig
      );
      console.log("Image removed successfully:", response.data);
      setterFunction((prev: any) =>
        prev.filter((item: any) => item.public_id != imagePublicId)
      );
    } catch (error) {
      console.error("Failed to remove image:", error);
    }
  };

  console.log(imagesUrl, "imagesUrl");

  return (
    <div className="max-w-md mx-auto mt-8">
      
      <p className="text-2xl font-black mb-4 flex items-center justify-center gap-2
       hover:bg-gray-200 w-fit p-2 cursor-pointer"  onClick={() =>{setselecteMenu('Add All Products')}}> <IoMdArrowRoundBack />  Back</p>
      <h2 className="text-2xl font-black mb-4">Add New Product</h2>
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
              setImagesUrl={setImagesUrl}
              handleFileChange={signlehandleFileChange}
              handleDrop={singlehandleDrop}
            />
          </>
        )}
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values }) => (
          <Form>
            {inputFields.map((inputField, index) => (
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

            <Field as="select" name="category" className="mb-4">
              <option value="">Select an option</option>

              {category && category.length > 0
                ? category.map((item: any, index) => {
                    return (
                      <option value={item._id} label={item.name} key={index}>
                        {item.name}
                      </option>
                    );
                  })
                : null}
            </Field>

            <div className="mb-4">
              <FieldArray name="modelDetails">
                {({ push, remove }) => (
                  <div>
                    {values.modelDetails.map((model, index) => (
                      <div key={index} className="row mb-4">
                        <div className="col mb-4">
                          <Field
                            type="text"
                            name={`modelDetails[${index}].name`}
                            placeholder="Name"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                          />
                          <ErrorMessage
                            name={`modelDetails[${index}].name`}
                            component="div"
                            className="text-red-500"
                          />
                        </div>
                        <div className="col mb-4">
                          <Field
                            type="text"
                            name={`modelDetails[${index}].detail`}
                            placeholder="Detail"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                          />
                          <ErrorMessage
                            name={`modelDetails[${index}].detail`}
                            component="div"
                            className="text-red-500"
                          />
                        </div>
                        <div className="col text-red-500">
                          <button type="button" onClick={() => remove(index)}>
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => push({ name: "", detail: "" })}
                    >
                      Add Model Detail
                    </button>
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
                          <Field
                            type="text"
                            name={`colors[${index}].colorName`}
                            placeholder="colors"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                          />
                          <ErrorMessage
                            name={`colors[${index}].colorName`}
                            component="div"
                            className="text-red-500"
                          />
                        </div>
                        <div className="col text-red-500">
                          <button type="button" onClick={() => remove(index)}>
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => push({ colorName: "" })}
                    >
                      Add colors
                    </button>
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
                          <Field
                            type="text"
                            name={`spacification[${index}].specsDetails`}
                            placeholder="Please Spacification"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                          />
                          <ErrorMessage
                            name={`spacification[${index}].specsDetails`}
                            component="div"
                            className="text-red-500"
                          />
                        </div>
                        <div className="col text-red-500">
                          <button type="button" onClick={() => remove(index)}>
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => push({ specsDetails: "" })}
                    >
                      Add spacification
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>

            <div className="mb-4">
              {hoverImage && hoverImage.length > 0 ? (
                <div className="flex gap-2 border-3 flex-wrap mb-3  ">
                  {hoverImage.map((item: any, index) => {
                    return (
                      <div className="group" key={index}>
                        <div className="flex justify-end invisible group-hover:visible ">
                          <RxCross2
                            className="cursor-pointer"
                            onClick={() => {
                              ImageRemoveHandler(item.public_id, sethoverImage);
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
                  <p className="mb-3 font-black">Add a Hover Image</p>

                  <Uploadfile
                    setImagesUrl={sethoverImage}
                    handleDrop={HoversinglehandleDrop}
                    handleFileChange={HoversignlehandleFileChange}
                  />
                </>
              )}
            </div>
            <p className="mb-3 font-black">Add a Products Images</p>

            <div className="mb-4">
              <Uploadfile
                setImagesUrl={setImagesUrl}
                handleFileChange={handleFileChange}
                handleDrop={handleDrop}
              />
            </div>

            {imagesUrl && imagesUrl.length > 0 ? (
              <div className="flex gap-2 border-3 flex-wrap mb-3  ">
                {imagesUrl.map((item: any, index) => {
                  return (
                    <div className="group" key={index}>
                      <div className="flex justify-end invisible group-hover:visible ">
                        <RxCross2
                          className="cursor-pointer"
                          onClick={() => {
                            ImageRemoved(item.public_id, setImagesUrl);
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
            ) : null}

            <div className="mb-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
               {loading ? <Loader /> : "Add Product" }
                
                
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProductForm;
