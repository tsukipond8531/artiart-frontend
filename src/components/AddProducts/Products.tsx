"use client";
import React, {
  useState,
  useEffect,
  DragEvent,
  SetStateAction,
  useLayoutEffect,
} from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";

import Uploadfile from "components/AddProducts/Uploadfile";
import Image from "next/image";
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { Product, ProductWithImages } from "types/interfaces";
import { inputFields, validationSchema, initialValues } from "Data/data";
import { RxCross2 } from "react-icons/rx";
import { IoMdArrowRoundBack } from "react-icons/io";
import Loader from "components/Loader/Loader";
import Toaster from "components/Toaster/Toaster";

interface ADDPRODUCTFORMPROPS {
  setselecteMenu: React.Dispatch<SetStateAction<any>>;
  setEditProduct: React.Dispatch<SetStateAction<ProductWithImages | undefined>>;
  EditInitialValues?: any | undefined;
  EditProductValue?: Product | undefined;
}

const AddProductForm = ({
  setselecteMenu,
  setEditProduct,
  EditInitialValues,
  EditProductValue,
}: ADDPRODUCTFORMPROPS) => {
  const [category, setCategory] = useState<any[]>();
  const [imagesUrl, setImagesUrl] = useState<any[]>([]);
  const [selectedFile, setSelectedFiles] = useState<any[] | null>(null);
  const [posterimageUrl, setposterimageUrl] = useState<any[] | null>();
  const [hoverImage, sethoverImage] = useState<any[] | null | undefined>();
  const [loading, setloading] = useState<boolean>(false);
  const [productInitialValue, setProductInitialValue] = useState<
    any | null | undefined
  >(EditProductValue);
  const [imgError, setError] = useState<string | null | undefined>();

  const onSubmit = async (values: Product, { resetForm }: any) => {
    try {
      setError(null);
      let posterImageUrl = posterimageUrl && posterimageUrl[0];
      let hoverImageUrl = hoverImage && hoverImage[0];
      let createdAt = Date.now();
      console.log(posterImageUrl, "posterimageUrl");
      if (!posterImageUrl || !hoverImageUrl || !(imagesUrl.length > 0)) {
        throw new Error("Please select relevant Images");
      }
      let newValue = {
        ...values,
        posterImageUrl,
        imageUrl: imagesUrl,
        hoverImageUrl,
        createdAt,
      };
      setloading(true);

      let updateFlag = EditProductValue && EditInitialValues ? true : false;
      let addProductUrl = updateFlag
        ? `/api/updateProduct/${EditInitialValues._id} `
        : null;
      let url = `${process.env.NEXT_PUBLIC_BASE_URL}${
        updateFlag ? addProductUrl : "/api/addProduct"
      }`;

      const response = await axios.post(url, newValue);
      console.log(response, "response");
      Toaster(
        "success",
        updateFlag
          ? "Product has been sucessufully Updated !"
          : "Product has been sucessufully Created !"
      );
      setProductInitialValue(null);
      if (updateFlag) {
        setEditProduct(undefined);
        setselecteMenu("Add All Products");
      }
      resetForm();
      setloading(false);
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
        console.log(err.response.data.error, "err.response.data.message");
      } else {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      }
    } finally {
      setloading(false);
    }
  };

  useLayoutEffect(() => {
    const CategoryHandler = async () => {
      try {
        if (!EditInitialValues) return;
        const {
          posterImageUrl,
          hoverImageUrl,
          imageUrl,
          _id,
          createdAt,
          updatedAt,
          __v,
          ...EditInitialProductValues
        } = EditInitialValues as any;
        imageUrl ? setImagesUrl(imageUrl) : null;
        sethoverImage([hoverImageUrl]);
        posterImageUrl ? setposterimageUrl([posterImageUrl]) : null;
      } catch (err) {
        console.log(err, "err");
      }
    };

    CategoryHandler();
  }, []);

  console.log(EditProductValue, "EditProductValue");

  useEffect(() => {
    const CategoryHandler = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`
        );
        const Categories = await response.json();
        setCategory(Categories);
      } catch (err) {
        console.log(err, "err");
      }
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
    } catch (error: any) {
      console.error("Failed to remove image:", error);
    }
  };

  return (
    <>
      <p
        className="text-2xl font-black mb-4 flex items-center justify-center gap-2
hover:bg-gray-200 w-fit p-2 cursor-pointer"
        onClick={() => {
          setselecteMenu("Add All Products");
        }}
      >
        {" "}
        <IoMdArrowRoundBack /> Back
      </p>
      <div className="container lg:px-52 mx-auto mt-8">
        <div className="grid gap-20 grid-cols-2 p-8 custom-shadow rounded-md border">
          {/* grid 1  */}
          <div>
            <Formik
              initialValues={
                productInitialValue ? productInitialValue : initialValues
              }
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

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <Field
                      as="select"
                      name="category"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white"
                    >
                      <option value="" className="text-gray-500">
                        Select a Category
                      </option>
                      {category && category.length > 0
                        ? category.map((item: any, index) => (
                            <option
                              value={item._id}
                              label={item.name}
                              key={index}
                              className="text-gray-900"
                            >
                              {item.name}
                            </option>
                          ))
                        : null}
                    </Field>
                    <ErrorMessage
                      name="category"
                      component="div"
                      className="text-red-500 mt-2"
                    />
                  </div>

                  <div className="mb-4">
                    <FieldArray name="modelDetails">
                      {({ push, remove }) => (
                        <div>
                          {values.modelDetails.map((model, index) => (
                            <div
                              key={index}
                              className="flex flex-col md:flex-row md:items-center mb-4"
                            >
                              <div className="md:flex-1 md:mr-4 mb-4 md:mb-0">
                                <Field
                                  type="text"
                                  name={`modelDetails[${index}].name`}
                                  placeholder="Name"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                />
                                <ErrorMessage
                                  name={`modelDetails[${index}].name`}
                                  component="div"
                                  className="text-red-500 mt-1"
                                />
                              </div>
                              <div className="md:flex-1 md:mr-4 mb-4 md:mb-0">
                                <Field
                                  type="text"
                                  name={`modelDetails[${index}].detail`}
                                  placeholder="Detail"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                />
                                <ErrorMessage
                                  name={`modelDetails[${index}].detail`}
                                  component="div"
                                  className="text-red-500 mt-1"
                                />
                              </div>
                              <div className="md:flex-none text-right">
                                <button
                                  type="button"
                                  onClick={() => remove(index)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          ))}
                          <div className="text-left">
                            <button
                              type="button"
                              onClick={() => push({ name: "", detail: "" })}
                              className="px-4 py-2 bg-black text-white rounded-md shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
                            >
                              Add Model Detail
                            </button>
                          </div>
                        </div>
                      )}
                    </FieldArray>
                  </div>

                  <div className="mb-4">
                    <FieldArray name="colors">
                      {({ push, remove }) => (
                        <div>
                          {values.colors.map((color, index) => (
                            <div
                              key={index}
                              className="flex flex-col md:flex-row md:items-center mb-4"
                            >
                              <div className="md:flex-1 md:mr-4 mb-4 md:mb-0">
                                <Field
                                  type="text"
                                  name={`colors[${index}].colorName`}
                                  placeholder="Color Name"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                />
                                <ErrorMessage
                                  name={`colors[${index}].colorName`}
                                  component="div"
                                  className="text-red-500 mt-1"
                                />
                              </div>
                              <div className="md:flex-none text-right">
                                <button
                                  type="button"
                                  onClick={() => remove(index)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          ))}
                          <div className="text-left">
                            <button
                              type="button"
                              onClick={() => push({ colorName: "" })}
                              className="px-4 py-2 bg-black text-white rounded-md shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
                            >
                              Add Color
                            </button>
                          </div>
                        </div>
                      )}
                    </FieldArray>
                  </div>

                  <div className="mb-4">
                    <FieldArray name="spacification">
                      {({ push, remove }) => (
                        <div>
                          {values.spacification.map((spec, index) => (
                            <div
                              key={index}
                              className="flex flex-col md:flex-row md:items-center mb-4"
                            >
                              <div className="md:flex-1 md:mr-4 mb-4 md:mb-0">
                                <Field
                                  type="text"
                                  name={`spacification[${index}].specsDetails`}
                                  placeholder="Specification Details"
                                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                />
                                <ErrorMessage
                                  name={`spacification[${index}].specsDetails`}
                                  component="div"
                                  className="text-red-500 mt-1"
                                />
                              </div>
                              <div className="md:flex-none text-right">
                                <button
                                  type="button"
                                  onClick={() => remove(index)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          ))}
                          <div className="text-left">
                            <button
                              type="button"
                              onClick={() => push({ specsDetails: "" })}
                              className="px-4 py-2 bg-black text-white rounded-md shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
                            >
                              Add Specification
                            </button>
                          </div>
                        </div>
                      )}
                    </FieldArray>
                  </div>
                  <div className="mb-4">
                    <button
                      type="submit"
                      className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-white hover:text-black hover:border hover:border-gray-200 hover:shadow-lg focus:outline-none focus:bg-blue-600"
                    >
                      {loading ? <Loader /> : "Add Product"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          {/* grid 2 */}
          <div>
            <h2 className="text-2xl font-black mb-4">Add New Product</h2>
            <div className="custom-shadow p-4 rounded-lg border">
              {posterimageUrl && posterimageUrl.length > 0 ? (
                <div className="flex flex-wrap mb-3 ">
                  {posterimageUrl.map((item: any, index) => {
                    return (
                      <div
                        className="group border border-gray-300 rounded-md overflow-hidden m-1 relative"
                        key={index}
                      >
                        <div className="absolute top-1 right-1 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <RxCross2
                            className="cursor-pointer text-gray-600"
                            onClick={() => {
                              ImageRemoveHandler(
                                item.public_id,
                                setposterimageUrl
                              );
                            }}
                          />
                        </div>
                        <Image
                          className="cursor-pointer"
                          width={100}
                          height={100}
                          src={item.imageUrl}
                          alt={`productImage-${index}`}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-left mb-3">
                  <p className="mb-1">Add a poster Image</p>
                  <Uploadfile
                    setImagesUrl={setImagesUrl}
                    handleFileChange={signlehandleFileChange}
                    handleDrop={singlehandleDrop}
                  />
                </div>
              )}
            </div>

            <div className="mb-4 mt-2">
              {hoverImage && hoverImage.length > 0 ? (
                <div className="flex flex-wrap mb-3">
                  {hoverImage.map((item: any, index) => {
                    return (
                      <div
                        className="group border border-gray-300 rounded-md overflow-hidden m-1 relative"
                        key={index}
                      >
                        <div className="absolute top-1 right-1 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <RxCross2
                            className="cursor-pointer text-gray-600"
                            onClick={() => {
                              ImageRemoveHandler(item.public_id, sethoverImage);
                            }}
                          />
                        </div>
                        <Image
                          className="cursor-pointer"
                          width={100}
                          height={100}
                          src={item.imageUrl}
                          alt={`productImage-${index}`}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className=" mb-3">
                  <p className="mb-1 font-black">Add a Hover Image</p>
                 <div className="custom-shadow p-4 rounded-lg border">
                 <Uploadfile
                    setImagesUrl={sethoverImage}
                    handleDrop={HoversinglehandleDrop}
                    handleFileChange={HoversignlehandleFileChange}
                  />
                 </div>
                </div>
              )}
            </div>
            <p className="mb-3 font-black">Add Product Images</p>
            <div className="mb-4 custom-shadow p-4 rounded-lg border">
              <Uploadfile
                setImagesUrl={setImagesUrl}
                handleFileChange={handleFileChange}
                handleDrop={handleDrop}
              />
            </div>

            {imagesUrl && imagesUrl.length > 0 ? (
  <div className="flex flex-wrap mb-3 ">
    {imagesUrl.map((item: any, index) => {
      return (
        <div className="group border border-gray-300 rounded-md overflow-hidden m-1 relative" key={index}>
          <div className="absolute top-1 right-1 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <RxCross2
              className="cursor-pointer text-gray-600"
              onClick={() => {
                ImageRemoved(item.public_id, setImagesUrl);
              }}
            />
          </div>
          <Image
            className="cursor-pointer"
            width={100}
            height={100}
            src={item.imageUrl}
            alt={`productImage-${index}`}
          />
        </div>
      );
    })}
  </div>
) : null}

{imgError ? (
  <div className="text-red-500 pt-2 pb-2">{imgError}</div>
) : null}

          </div>
        </div>
      </div>
    </>
  );
};

export default AddProductForm;
