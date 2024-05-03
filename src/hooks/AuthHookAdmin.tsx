
'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import Loader from "components/Loader/Loader";


function ProtectedRoute(WrappedComponent:any) {
  const Wrapper=(props: any) => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
   
    useEffect(() => {
      let token = localStorage.getItem("2guysAdminToken"); 
      console.log(token, "token")

      if (!token) {
        router.push("/dashboardlogin");
      } else {
        setLoading(false);
      }
    }, [router]);

    if (loading) {
      return (
        <div
          style={{
            background: "#FFF",
            zIndex: 1111,
            alignItems: "center",
            display: "flex",
            height: "100vh",
            width: "-webkit-fill-available",
            justifyContent: "center",
          }}
        >
          <Loader />
        </div>
      );
    } else {
    

      return <WrappedComponent {...props} />;
    }
  };

  return Wrapper;
}

export default ProtectedRoute;
