
'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import Loader from "components/Loader/Loader";


function ProtectedRoute(WrappedComponent:any) {
  const Wrapper=(props: any) => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    let token = localStorage.getItem("2guysToken"); 
    if (typeof window !== 'undefined') {
      token = localStorage.getItem("2guysToken"); 
    
    }

    useEffect(() => {
      console.log(token, "token")
      if (!token) {
        // Redirect to login page if token is not present
        router.push("/login");
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
