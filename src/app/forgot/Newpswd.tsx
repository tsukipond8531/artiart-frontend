"use client";

import Input from "components/Common/Input";
import Button from "components/Common/Button";

import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Toaster from "components/Toaster/Toaster";



interface NewPasswordProps {
  email: string | any; // Define the type of email parameter
}
function Newpswd({ email }: NewPasswordProps) {
  const router = useRouter();

  const [error, setError] = useState<string | null | undefined>();

  const [formData, setFormData] = useState({
    newPassword: "",
    password: "",
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
    if (!formData.newPassword || !formData.password) return setError("All fields are rquired");
    if (formData.newPassword !== formData.password) return setError("confirm and new password should be same");
    if (!email) return null;
    try {
      console.log("formData", formData);
      let user: any = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/passwordReset`,
        { password: formData.password, email: email }
      );
      console.log(user.data);
      Toaster("success", "You have sucessfully login")
      setTimeout(()=>{
        router.push("/");
      },1000)
    } catch (err: any) {
      console.log(err, "err");
      setError(err.message);
    }
  };
  return (
    <div className="max-w-screen-sm m-auto p-2 sm:p-10 md:p-20 mt-10">
      <form className=" space-y-4" onClick={handleSubmit}>
        <Input
          type="text"
          name="password"
          placeholder="Password"
          label="Password"
          onChange={handleChange}
          value={formData.password}
        />
        <Input
          type="text"
          name="newPassword"
          placeholder="New password"
          label="New password"
          onChange={handleChange}
          value={formData.newPassword}
        />
        {error ? (
          <div className="flex justify-center text-red-600">{error}</div>
        ) : null}
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
    </div>
  );
}

export default Newpswd;
