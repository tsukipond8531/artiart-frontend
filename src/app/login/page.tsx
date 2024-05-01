'use client'

import React, { useState } from "react";
import Button from "components/Common/Button";
import { HeadingH3 } from "components/Common/Heading";
import Input from "components/Common/Input";
import Footer from "components/layout/Footer";
import Navbar from "components/layout/Header/Navbar";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Toaster from "components/Toaster/Toaster";
import Loader from "components/Loader/Loader";




const Login: React.FC = () => {
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null | undefined>();
  const [loading, setloading] = useState<boolean | null | undefined>(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
   
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setloading(true)
    if(!formData.email || !formData.password) return  setError('All fields are rquired')
   try{
    let user:any = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/login`,formData)
    console.log(user.data, "user token")
    const ISSERVER = typeof window === "undefined"
    !ISSERVER ? localStorage.setItem('2guysToken', user.data.token) : null
    setloading(false)

      Toaster("success", "You have sucessfully login")
      setTimeout(()=>{
      router.push('/')
  
      },1000)
  

   }catch(err:any){
    console.log(err, "err")
    setloading(false)

    setError(err.message)
   }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-screen-sm m-auto p-2 sm:p-10 md:p-20 mt-10">
        <HeadingH3 className="text-center mb-10" title={"Login"} />
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            id="email"
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
            id="password"

          />
{error? <div className="flex justify-center text-red-600">
  {error}
</div> : null }
          <Link className="underline text-[14px]" href={"/forgot"}>
            Forgot your password?
          </Link>

          <div className="flex flex-col justify-center items-center space-y-3 lg:pt-10">
            <Button
              className="bg-black text-white p-3 w-full md:w-28 rounded-none"
              title={loading ? <Loader color= '#fff'/>  : "Sign In"}
              type="submit"
            />
            <Link className="underline text-[14px]" href={"/register"}>
Create account
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;
