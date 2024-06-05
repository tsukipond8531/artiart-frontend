"use client";
import React, {
  useState,
  useEffect,
  SetStateAction,
  useLayoutEffect,
} from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import Image from "next/image";
import axios, { AxiosRequestConfig } from "axios";
import { Product, ProductWithImages } from "types/interfaces";
import { inputFields, validationSchema, initialValues, withoutVariation, Variation } from "Data/data";
import { RxCross2 } from "react-icons/rx";
import { IoMdArrowRoundBack } from "react-icons/io";
import Loader from "components/Loader/Loader";
import Toaster from "components/Toaster/Toaster";
import Imageupload from 'components/ImageUpload/Imageupload';


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
  const [posterimageUrl, setposterimageUrl] = useState<any[] | null>();
  const [hoverImage, sethoverImage] = useState<any[] | null | undefined>();
  const [loading, setloading] = useState<boolean>(false);
  const [productInitialValue, setProductInitialValue] = useState<any | null | undefined>(EditProductValue);
  const [imgError, setError] = useState<string | null | undefined>();
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [quantity, setQuantity] = useState<number | ''>('');
  const [color, setColor] = useState<string>('');

  const handleOptionChange = (e: any) => {
    setSelectedOption(e.target.value);
    setQuantity('');
    setColor('');
  };

  const onSubmit = async (values: Product, { resetForm }: any) => {
    try {
      setError(null);
      let posterImageUrl = posterimageUrl && posterimageUrl[0];
      let hoverImageUrl = hoverImage && hoverImage[0];
      let createdAt = Date.now();
      if (!posterImageUrl || !hoverImageUrl || !(imagesUrl.length > 0)) {
        throw new Error("Please select relevant Images");

      }

      console.log(values.colors, "colors")
      const validColors = values.colors.map(color => color.colorName.toLowerCase());

      // Check if all the image color codes are valid
      const invalidColors = imagesUrl.filter(img => {
        if (!img || !img.colorCode) {
          throw new Error("Image colors codes are required");
        }

        !validColors.includes(img.colorCode.toLowerCase())
      });
      if (invalidColors.length > 0) {
        throw new Error("Some image color codes are invalid.");
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
      let url = `${process.env.NEXT_PUBLIC_BASE_URL}${updateFlag ? addProductUrl : "/api/addProduct"
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
        // setselecteMenu("Add All Products");
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
          console.log((err.message), "(err.message)");

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

  const handleColorCodeChange = (index: number, newColorCode: string) => {
    const updatedImagesUrl = imagesUrl.map((item, i) =>
      i === index ? { ...item, colorCode: newColorCode } : item
    );
    setImagesUrl(updatedImagesUrl);
  };


  return (
    <>
      <p
        className="text-2xl font-black mb-4 flex items-center justify-center gap-2 hover:bg-gray-200 w-fit p-2 cursor-pointer"
        onClick={() => {
          setselecteMenu("Add All Products");
        }}
      >
        {" "}
        <IoMdArrowRoundBack /> Back
      </p>
      <div className="container mx-auto mt-4 sm:mt-6 md:mt-8 lg:mt-8 xl:mt-8 px-4 sm:px-6 md:px-8 lg:px-32 xl:px-52">
        <div className="grid gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 grid-cols-1 sm:grid-cols-2 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 custom-shadow rounded-md border">

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
                  <div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Add stock Quantity
                      </label>
                      <Field
                        id="variationSelect" value={selectedOption} onChange={handleOptionChange}
                        as="select"
                        name="category"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white"
                      >
                        <option value="" className="text-gray-500">
                          Select a Variation
                        </option>
                        <option value="withoutVariation">Without Variation</option>
                        <option value="withVariation">With Variation</option>
                      </Field>
                    </div>

                    {selectedOption === 'withoutVariation' && (
                      <>
                        {withoutVariation.map((inputField, index) => (
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
                      </>
                    )}

                    {selectedOption === 'withVariation' && (
                      <>
                        <FieldArray name="variantStockQuantities">
                          {({ push, remove }) => (
                            <div>
                              {values.variantStockQuantities.map((model, index) => (
                                <div
                                  key={index}
                                  className="flex flex-col md:flex-row md:items-center mb-4"
                                >
                                  <div className="md:flex-1 md:mr-4 mb-4 md:mb-0">
                                    <Field
                                      type="text"
                                      name={`variantStockQuantities[${index}].Variant`}
                                      placeholder="Variant"
                                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                    />
                                    <ErrorMessage
                                      name={`variantStockQuantities[${index}].Variant`}
                                      component="div"
                                      className="text-red-500 mt-1"
                                    />
                                  </div>
                                  <div className="md:flex-1 md:mr-4 mb-4 md:mb-0">
                                    <Field
                                      type="number"
                                      name={`variantStockQuantities[${index}].Quantity`}
                                      placeholder="Quantity"
                                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                    />
                                    <ErrorMessage
                                      name={`variantStockQuantities[${index}].Quantity`}
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
                                  Add Variation
                                </button>
                              </div>
                            </div>
                          )}
                        </FieldArray>
                      </>
                    )}
                  </div>



                  <div className="mb-4 pt-4">
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
                  <Imageupload setposterimageUrl={setposterimageUrl} />

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
                          src={item.imageUrl ? item.imageUrl : '/images/dummy.jpg'}
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
                    <Imageupload sethoverImage={sethoverImage} />


                  </div>
                </div>
              )}
            </div>
            <p className="mb-3 font-black">Add Product Images</p>
            <div className="mb-4 custom-shadow p-4 rounded-lg border">
              <Imageupload setImagesUrl={setImagesUrl} />

            </div>

            {imagesUrl && imagesUrl.length > 0 ? (
              <div className="flex flex-wrap mb-3 ">
                {imagesUrl.map((item: any, index) => {
                  return (
                    <>
                      <div className="flex flex-col gap-1">
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
                        <input type="text" placeholder="Add color code" className="border borde-2 focus:outline-none w-full" value={item.colorCode} required
                          onChange={(e) => handleColorCodeChange(index, e.target.value)}

                        />

                      </div>

                    </>
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
