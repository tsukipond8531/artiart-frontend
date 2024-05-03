'use client'

import React, { useState,useEffect } from "react";
import Button from "components/Common/Button";
import { HeadingH3 } from "components/Common/Heading";
import Input from "components/Common/Input";
import Footer from "components/layout/Footer";
import Navbar from "components/layout/Header/Navbar";

import { useRouter } from "next/navigation";

import AllAdmins from 'components/AdminsDashboard/Alladmins'
import CreateAdmin from 'components/AdminsDashboard/NewAdmins'
import Toaster from "components/Toaster/Toaster";
import ProtectedRoute from 'hooks/AuthHookSuperAdmin'




const dashboardLogin= () => {
  const router = useRouter()
  const [selecteMenu, setselecteMenu] = useState<string | null | undefined>('AllAdmins');
  const [isLogin, setIsLogin] = useState<boolean | null | undefined>(false);


  useEffect(()=>{
    const token = localStorage.getItem("superAdminToken");
    if (!token) {
      setIsLogin(false)
      return;
    }
    setIsLogin(true)
  },[])

  const tokenRemoveHandler = ()=>{
    const ISSERVER = typeof window === "undefined"
    !ISSERVER ? localStorage.removeItem("superAdminToken") : null
      Toaster("success", "You have sucessfully logout")
      setTimeout(()=>{
      router.push("/superAdminlogin");
  
      },1000)
  
    

  }

  return (
    <>
      <Navbar />
      <div className="mt-4 p-4">
       {isLogin ? <div><p className="underline flex justify-end cursor-pointer" onClick={()=>{tokenRemoveHandler()}}>log out</p></div> : null} 
        {selecteMenu == "AllAdmins" ?
<AllAdmins setselecteMenu={setselecteMenu}/>
         :
<CreateAdmin setselecteMenu={setselecteMenu}/>
         
         }

      </div>
      <Footer />
    </>
  );
};

export default ProtectedRoute(dashboardLogin);

