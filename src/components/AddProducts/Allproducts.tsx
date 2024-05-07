import React from "react";
import { Table, Button } from "antd";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";  
import axios from "axios";
import Loader from "components/Loader/Loader";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { FaRegEye } from "react-icons/fa6";

function Category({ Categories, setCategory, setselecteMenu, loading,canAddProduct,canDeleteProduct }: any) {
  const router = useRouter()
  
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


  console.log(Categories)
  // const columns = [
  //   {
  //     title: "Image",
  //     dataIndex: "posterImageUrl",
  //     key: "posterImageUrl",
  //     render: (text: any, record: any) => (
  //       <Image
  //         src={record.posterImageUrl?.imageUrl}
  //         alt={`Image of ${record.name}`}
  //         width={50}
  //         height={50}
  //       />
  //     ),
  //   },
  //   {
  //     title: "Name",
  //     dataIndex: "name",
  //     key: "name",
  //   },
  //   {
  //     title: "Created At",
  //     dataIndex: "createdAt",
  //     key: "createdAt",
  //     render: (text: any, record: any) => (
  //    console.log(record.name, "record name")
  //     ),
  //   },
  //   {
  //     title: "Action",
  //     key: "action",
  //     render: (text: any, record: any) => (
  //       <RiDeleteBin6Line
  //         className={`cursor-pointer${canDeleteProduct && 'text-red-500'} ${
  //           !canDeleteProduct && 'cursor-not-allowed text-gray-400'
  //         }`}
  //         size={20}
  //         onClick={() => {if(canDeleteProduct){handleDelete(record._id)}}}
  //       />
  //     ),
  //   },
  // ];



  const columns = [
    {
      title: "Image",
      dataIndex: "posterImageUrl",
      key: "posterImageUrl",
      render: (text:any, record:any) => (
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
      title: "Date",
      dataIndex: "createdAt",
      key: "date",
      render: (text:any, record:any) => {
        const createdAt = new Date(record.createdAt);
        const formattedDate = `${createdAt.getFullYear()}-${String(
          createdAt.getMonth() + 1
        ).padStart(2, "0")}-${String(createdAt.getDate()).padStart(2, "0")}`;
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: "Time",
      dataIndex: "createdAt",
      key: "time",
      render: (text:any, record:any) => {
        const createdAt = new Date(record.createdAt);
        const formattedTime = `${String(createdAt.getHours()).padStart(
          2,
          "0"
        )}:${String(createdAt.getMinutes()).padStart(2, "0")}
  
        `;
        return <span>{formattedTime}</span>;
      },
    },
    {
      title: "Preview",
      key: "Preview",
      render: (text: any, record: any) => {
        const handleClick = () => {
          console.log(record, "record")
          const queryParams = new URLSearchParams({
            product: JSON.stringify(record)
          }).toString();
          const url = `/detail/-${record._id}?${queryParams}`;
          window.open(url, '_blank');
        };
        return <FaRegEye className="cursor-pointer" onClick={handleClick} />

      },
    },
    {
      title: "Action",
      key: "action",
      render: (text:any, record:any) => (
        <RiDeleteBin6Line
          className={`${canDeleteProduct ? "text-red-500 cursor-pointer" : ""} ${
            !canDeleteProduct ? "cursor-not-allowed text-gray-400" : ""
          }`}
          size={20}
          onClick={() => {
            if (canDeleteProduct) {
              handleDelete(record._id);
            }
          }}
        />
      ),
    },
  ];
  
  return (
    <div>
{
  loading 
  ? <div className="flex justify-center mt-10"><Loader/></div>  :

<>

      <div className="flex justify-between mb-4">
        <p>Products</p>
        <div>
          <p
            className={`${canAddProduct && 'cursor-pointer'} p-2 ${ canAddProduct &&'hover:bg-gray-200'} flex justify-center ${
              !canAddProduct && 'cursor-not-allowed text-gray-400'
            }`}
            onClick={() => {
              if(canAddProduct){
                setselecteMenu("Add Products");
              }

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
