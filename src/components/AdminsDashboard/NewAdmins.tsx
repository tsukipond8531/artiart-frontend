"use client"

import React, { useState } from "react";
import Button from "components/Common/Button";
import { HeadingH3 } from "components/Common/Heading";
import Input from "components/Common/Input";
import Footer from "components/layout/Footer";
import Navbar from "components/layout/Header/Navbar";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from "components/Loader/Loader";
import Toaster from "components/Toaster/Toaster";
import { IoMdArrowRoundBack } from "react-icons/io";


const AddAdmin = ({setselecteMenu}:any) => {
  const router = useRouter();
  const [error, setError] = useState<string | null | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  // Initialize state for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    canAddProduct: false,
    canDeleteProduct: false,
    canAddCategory: false,
    canDeleteCategory: false,
  });

  // Function to handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Update the form data state with the new value
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const token = localStorage.getItem("superAdminToken");
    if (!token) {
      return;
    }
    setLoading(true);
console.log(formData, "formData")
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    )
      return setError("All fields are required");
    try {
      let user = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admins/createAdmin`,formData,{
        headers: {
          "token" : token
        }
      });
      Toaster("success", "Admin user has been sucessufully Created !");
      if(user){
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          canAddProduct: false,
          canDeleteProduct: false,
          canAddCategory: false,
          canDeleteCategory: false,
        });
      }
    } catch (err: any) {
      console.log(err, "err");
      setError(err.message || JSON.stringify(err));
    }
    finally {
      setLoading(false);
    
    }
  };

  return (
    <>
      <div className="max-w-screen-sm m-auto p-2 sm:p-10 md:p-20 mt-10">
      <p className="text-2xl font-black mb-4 flex items-center justify-center gap-2
       hover:bg-gray-200 w-fit p-2 cursor-pointer"  onClick={() =>{setselecteMenu('AllAdmins')}}> <IoMdArrowRoundBack />  Back</p>
        <HeadingH3 className="text-center mb-10" title={"Create New Admin"} />
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            type="text"
            name="firstName"
            placeholder="Enter First Name"
            label="First Name"
            value={formData.firstName}
            onChange={handleChange}
            id="firstName"
            
          />
          <Input
            type="text"
            name="lastName"
            placeholder="Enter Last Name"
            label="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            id="lastName"
            
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            id="email"
          />
          <Input
            type="password"
            name="password"
            placeholder="Enter Password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            id="password"
        
          />
<div className="flex items-center justify-between w-[250px]">
<label htmlFor="canAddProduct">Can Add Product</label>

<Input
  type="checkbox"
  name="canAddProduct"
  checked={formData.canAddProduct}
  onChange={(e:any) =>
    setFormData((prevData) => ({
      ...prevData,
      canAddProduct: e.target.checked,
    }))
  }
  id="canAddProduct"
/>
</div>

<div className="flex items-center justify-between w-[250px]">
<label htmlFor="canDeleteProduct">Can Delete Category</label>

<Input
  type="checkbox"
  name="canDeleteProduct"
  checked={formData.canDeleteProduct}
  onChange={(e:any) =>
    setFormData((prevData) => ({
      ...prevData,
      canDeleteProduct: e.target.checked,
    }))
  }
  id="canDeleteProduct"
/>
</div>

<div className="flex items-center justify-between w-[250px]">
<label htmlFor="canAddCategory">Can Add Category</label>

<Input
  type="checkbox"
  name="canAddCategory"
  checked={formData.canAddCategory}
  onChange={(e:any) =>
    setFormData((prevData) => ({
      ...prevData,
      canAddCategory: e.target.checked,
    }))
  }
  id="canAddCategory"
/>
</div>

<div className="flex items-center justify-between w-[250px]">
  <label htmlFor="canDeleteCategory">Can Delete Category</label>
<Input
  type="checkbox"
  name="canDeleteCategory"
  checked={formData.canDeleteCategory}
  onChange={(e:any) =>
    setFormData((prevData) => ({
      ...prevData,
      canDeleteCategory: e.target.checked,
    }))
  }
  id="canDeleteCategory"
/>

</div>

          {error ? (
            <div className="flex justify-center text-red-600">{error}</div>
          ) : null}
          <div className="flex flex-col justify-center items-center space-y-3 lg:pt-8">
            <Button
              className="bg-black text-white p-3 rounded-none w-full md:w-28"
              title={loading ? <Loader color="#fff" /> : "Create"}
              type="submit"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddAdmin;
