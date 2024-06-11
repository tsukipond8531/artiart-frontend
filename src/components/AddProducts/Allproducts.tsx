import React, { useState } from "react";
import { Table } from "antd";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import Loader from "components/Loader/Loader";
import { useRouter } from "next/navigation";
import { FaRegEye } from "react-icons/fa";
import { LiaEdit } from "react-icons/lia";
import { generateSlug } from 'Data/data';

interface Product {
  _id: string;
  name: string;
  category: string;
  posterImageUrl: { imageUrl: string };
  createdAt: string;
}

interface CategoryProps {
  Categories:any;
  setCategory: any;
  setselecteMenu: (menu: string) => void;
  loading: boolean;
  canAddProduct: boolean;
  canDeleteProduct: boolean;
  setEditProduct:any;
}

const Category: React.FC<CategoryProps> = ({
  Categories,
  setCategory,
  setselecteMenu,
  loading,
  canAddProduct,
  canDeleteProduct,
  setEditProduct
}) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts: Product[] = Categories?.filter((product:any) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleDelete = async (key: string) => {
    try {
      let response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/deleteProduct/${key}`
      );
      console.log("Deleted", response);
      setCategory((prev: Product[]) => prev.filter((item) => item._id !== key));
    } catch (err) {
      console.log("Deleting record with key:", err);
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "posterImageUrl",
      key: "posterImageUrl",
      render: (text: any, record: Product) => (
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
      title: "Stock Quantity",
      dataIndex: "totalStockQuantity",
      key: "totalStockQuantity",
    },

    {
      title: "Date",
      dataIndex: "createdAt",
      key: "date",
      render: (text: any, record: Product) => {
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
      render: (text: any, record: Product) => {
        const createdAt = new Date(record.createdAt);
        const formattedTime = `${String(createdAt.getHours()).padStart(
          2,
          "0"
        )}:${String(createdAt.getMinutes()).padStart(2, "0")}`;
        return <span>{formattedTime}</span>;
      },
    },
    {
      title: "Preview",
      key: "Preview",
      render: (text: any, record: Product) => {
        const handleClick = () => {
          console.log(record, "record");

          const url = `/detail/${generateSlug(record.name)}`;
          window.open(url, '_blank');
        };
        return <FaRegEye className="cursor-pointer" onClick={handleClick} />;
      },
    },
    {
      title: "Edit",
      key: "Edit",
      render: (text: any, record: Product) => (
        <LiaEdit
          className={"cursor-pointer"}
          size={20}
          onClick={() => {
            setEditProduct(record);
            setselecteMenu("Add Products");
          }}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: Product) => (
        <RiDeleteBin6Line
          className={`${canDeleteProduct ? "text-red-500 cursor-pointer" : ""} ${!canDeleteProduct ? "cursor-not-allowed text-gray-400" : ""
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
      {loading ? (
        <div className="flex justify-center mt-10">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex justify-between mb-4 items-center flex-wrap">
            <input
              className="peer lg:p-3 p-2 block outline-none border rounded-md border-gray-200 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
              type="search"
              placeholder="Search Product"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div>
              <p
                className={`${
                  canAddProduct && 'cursor-pointer'
                } p-2 ${canAddProduct && 'hover:bg-gray-200'} flex justify-center ${
                  !canAddProduct && 'cursor-not-allowed text-gray-400'
                }`}
                onClick={() => {
                  if (canAddProduct) {
                    setselecteMenu("Add Products");
                    setEditProduct(undefined);
                  }
                }}
              >
                Add Products
              </p>
            </div>
          </div>
          {filteredProducts && filteredProducts.length > 0 ? (
            <Table className="overflow-x-scroll" dataSource={filteredProducts} columns={columns} rowKey="_id" pagination={false} />
          ) : (
            "No Products found"
          )}
        </>
      )}
    </div>
  );
};

export default Category;
