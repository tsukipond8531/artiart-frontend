"use client";

import Button from "components/Common/Button";
import { HeadingH3 } from "components/Common/Heading";
import Input from "components/Common/Input";
import { Para14 } from "components/Common/Paragraph";
import Footer from "components/layout/Footer";
import Navbar from "components/layout/Header/Navbar";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Newpswd from "../forgot/Newpswd";

const Forgot = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null | undefined>();
  const [forgotEmail, setforgotEmail] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!formData.email) return setError("All fields are rquired");
    try {
      let user: any = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/emailVarify`,
        formData
      );
      console.log(user, 'user')
      setforgotEmail(true)
    } catch (err: any) {
      console.log(err, "err");
      setError(err.message);
    }
  };

  return (
    <>
      <Navbar />
      {!forgotEmail ? 
      <div className="max-w-screen-sm m-auto p-2 sm:p-10 md:p-20 mt-10">
        <HeadingH3 className="text-center " title={"Reset your password"} />
        <Para14
          className="text-center mb-10"
          title={"We will send you an email to reset your password"}
        />
        <form className=" space-y-4" onClick={handleSubmit}>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            label="Email"
            id={"Email"}
            onChange={handleChange}
            value={formData.email}
          />
          <div className=" flex flex-col justify-center items-center space-y-3">
            <Button
              className="bg-black text-white w-full md:w-28 p-3 rounded-none"
              title={"Submit"}
            />
            <Link className="underline text-[14px]" href={"/login"}>
              Cancel
            </Link>
          </div>
        </form>
        {error? <div className="flex justify-center text-red-600">
  {error}
</div> : null }
      </div>
      : 
      <Newpswd email={formData.email}/>
      
      }


      <Footer />
    </>
  );
};

export default Forgot;
