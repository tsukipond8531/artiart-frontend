import React from "react";
import { Table, Button } from "antd";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";  
import axios from "axios";
import Loader from "components/Loader/Loader";

function Category({ Categories, setCategory, setselecteMenu, loading }: any) {
  const handleDelete = async (key: any) => {
    try {
      let reponse = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/deleteProduct/${key}`
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
          src={record.posterImageUrl?.imageUrl}
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
          className="cursor-pointer text-red-500"
          size={20}
          onClick={() => handleDelete(record._id)}
        />
      ),
    },
  ];

  return (
    <div>
      {/* Categories */}
{
  loading 
  ? <div className="flex justify-center mt-10"><Loader/></div>  :

<>

      <div className="flex justify-between mb-4">
        <p>Products</p>
        <div>
          <p
            className="cursor-pointer p-2 hover:bg-gray-200 flex justify-center"
            onClick={() => {
              setselecteMenu("Add Products");

            }}
          >
            Add Products
          </p>
        </div>
      </div>
      {Categories && Categories.length > 0 ? (
        <Table dataSource={Categories} columns={columns} />
      ) : (
        "No Products found"
      )}
</>

}


    </div>
  );
}

export default Category;
