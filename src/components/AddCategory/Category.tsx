import React from "react";
import { Table, Button } from "antd";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import Loader from "components/Loader/Loader";


function Category({ Categories, setCategory, setselecteMenu, loading, canAddCategory,canDeleteCategory }: any) {
  const handleDelete = async (key: any) => {
    try {
      let reponse = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/deleteCategory/${key}`
      );
      console.log("Deleted", reponse);
      setCategory((prev: any) => prev.filter((item: any) => item._id != key));
    } catch (err) {
      console.log("Deleting record with key:", err);
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "posterImageUrl",
      key: "posterImageUrl",
      render: (text: any, record: any) => (
        <Image
          src={record.posterImageUrl.imageUrl}
          alt={`Image of ${record.name}`}
          width={50}
          height={50}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: any) => (
        <RiDeleteBin6Line
        className={`cursor-pointer ${canDeleteCategory && 'text-red-500'} ${
          !canDeleteCategory && 'cursor-not-allowed text-gray-400'
        }`}
          // className="cursor-pointer text-red-500"
          size={20}
          onClick={() =>{if(canDeleteCategory){handleDelete(record._id)} }}
        />
      ),
    },
  ];

  return (
    <div>
      {/* Categories */}


      {
        loading ?<div className="flex justify-center mt-10"><Loader/></div> : 

      <>
      <div className="flex justify-between mb-4">
        <p>Categories</p>
        <div>
          {/* <p
            className="cursor-pointer hover:bg-[#ccc]-100 p-2 "
            onClick={() => {
              setselecteMenu("Categories");
              console.log("function called");
            }}
          >
            Add Category
          </p> */}

          <p
  className={`${canAddCategory && 'cursor-pointer'} hover:bg-[#ccc]-100 p-2 ${
    !canAddCategory && 'cursor-not-allowed text-gray-400'
  }`}
  onClick={() => {
    if (canAddCategory) {
      setselecteMenu("Categories");
      console.log("function called");
    }
  }}
>
  Add Category
</p>
        </div>
      </div>
      {Categories && Categories.length > 0 ? (
        <Table dataSource={Categories} columns={columns} />
      ) : (
        "No Categories found"
      )}
      
      </>
      }

    </div>
  );
}

export default Category;
