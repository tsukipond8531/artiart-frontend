import React, { useEffect, useState } from "react";
import { Table, Button } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import Loader from "components/Loader/Loader";

function Admins({setselecteMenu}:any) {
  const [admins, setAdmins] = useState([]);
  const [loading, setloading] = useState<boolean>(false);
  const [delLoading, setDelLoading] = useState<string | null>(null);


  useEffect(() => {
    const getAllAdmins = async () => {
  
  try{
    setloading(true)
      const token = localStorage.getItem("superAdminToken");
      if (!token) {
        return;
      }
  
      const headers = {
        'token': token
      };
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admins/getAllAdmins`, {
        method: 'GET',
        headers: headers
      });
  
  
      const admins = await response.json();
      setAdmins(admins);
    setloading(false)

  }catch(err){
    console.log(err, "err")
    setloading(false)

  }

  

    };
  
    getAllAdmins();
  }, []);
  

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("superAdminToken");
      if (!token) {
        // Handle case where token is not available
        return;
      }
      setDelLoading(id); // Set loading state for the specific admin being deleted
      await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admins/deletAdmin/${id}`,{
        headers:{
          "token":token
        }
      });
      setAdmins(prevAdmins => prevAdmins.filter((admin: any) => admin._id !== id));
    } catch (error) {
      console.error("Error deleting admin:", error);
    } finally {
      setDelLoading(null); // Reset loading state after delete operation completes
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: any, record: any) => `${record.firstName} ${record.lastName}`
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Can Add Product",
      dataIndex: "canAddProduct",
      key: "canAddProduct",
      render: (text: any, record: any) => (
        <span>{record.canAddProduct ? "Yes" : "No"}</span>
      ),
    },
    {
      title: "Can Delete Product",
      dataIndex: "canDeleteProduct",
      key: "canDeleteProduct",
      render: (text: any, record: any) => (
        <span>{record.canDeleteProduct ? "Yes" : "No"}</span>
      ),
    },
    {
      title: "Can Add Category",
      dataIndex: "canAddCategory",
      key: "canAddCategory",
      render: (text: any, record: any) => (
        <span>{record.canAddCategory ? "Yes" : "No"}</span>
      ),
    },
    {
      title: "Can Delete Category",
      dataIndex: "canDeleteCategory",
      key: "canDeleteCategory",
      render: (text: any, record: any) => (
        <span>{record.canDeleteCategory ? "Yes" : "No"}</span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: any, record: any) => (
        delLoading === record._id ? // Check if loading state matches current admin ID
          <Loader /> :
          <RiDeleteBin6Line 
            className="cursor-pointer text-red-500"
            size={20}
            onClick={() => handleDelete(record._id)}
          />
      ),
    },
  ];
  

  return (
    <div>
      {/* Admins Table */}
      {loading ? (
        <div className="flex justify-center mt-10">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex justify-between mb-4 items-center">
            <p>Admins</p>
            <div>
              <Button type="primary" onClick={() => setselecteMenu("Add Admin")}>Add new Admin</Button>
            </div>
          </div>
          {
              admins  && admins.length > 0 ?
            <Table dataSource={admins} columns={columns} pagination={false} /> : <div className="flex justify-center"> No Admin found</div>
              
              
            }
        </>
      )}
    </div>
  );
}

export default Admins;
