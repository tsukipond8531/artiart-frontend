"use client";

import React, { useState } from "react";
import Button from "components/Common/Button";
import { HeadingH3 } from "components/Common/Heading";
import Input from "components/Common/Input";
import Footer from "components/layout/Footer";
import Navbar from "components/layout/Header/Navbar";
import axios from "axios";
import { useRouter } from "next/navigation";
const Register: React.FC = () => {
  const router = useRouter()
  const [error, setError] = useState<string | null | undefined>()
  
  // Initialize state for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
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

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("")
    if(!formData.firstName || !formData.lastName || !formData.email || !formData.password) return  setError('All fields are rquired')
   try{
    let user = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/signup`,formData)
    router.push('/login')
    console.log(user, "user")

   }catch(err:any){
    console.log(err, "err")
    setError(err.message || JSON.stringify(err))


   }
  };
  

  return (
    <>
      <Navbar />
      <div className="max-w-screen-sm m-auto p-2 sm:p-10 md:p-20 mt-10">
        <HeadingH3 className="text-center mb-10" title={"Create Account"} />
        <form className="space-y-4" onSubmit={handleSubmit}>
        
          <Input
            type="text"
            name="firstName"
            placeholder="Enter First Name"
            label="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <Input
            type="text"

            name="lastName"
            placeholder="Enter Last Name"
            label="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Enter Password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
          />

{error? <div className="flex justify-center text-red-600">
  {error}
</div> : null }
       
          <div className="flex flex-col justify-center items-center space-y-3 lg:pt-8">
            <Button
              className="bg-black text-white p-3 rounded-none w-full md:w-28"
              title={"Create"}
              type="submit"
            />
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Register;
