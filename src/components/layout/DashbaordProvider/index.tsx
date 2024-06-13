"use client";
import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { RiUserSearchLine } from "react-icons/ri";
import Logo from "components/Common/Logo";
import AddProductForm from "components/AddProducts/Products";
import Allproducts from "components/AddProducts/Allproducts";
import CategoryForm from "components/AddCategory/Products";
import Categories from "components/AddCategory/Category";
import { useAppSelector } from "components/Others/HelperRedux";
import Toaster from "components/Toaster/Toaster";
import { useRouter } from "next/navigation";
import ProtectedRoute from "hooks/AuthHookAdmin";
import { ProductWithImages } from "types/interfaces";
import SEO from "components/SEO/SEO";

const DashboardProvider = ({ children }: any) => {
  const { Header, Sider, Content } = Layout;
  const [isVisible, setIsVisible] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [selectedMenu, setSelectedMenu] = useState<string>("Add All Products");
  const [category, setCategory] = useState<any[]>();
  const [products, setProducts] = useState<any[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [productLoading, setProductLoading] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean | null | undefined>(false);
  const router = useRouter();
  const [editProduct, setEditProduct] = useState<ProductWithImages | undefined>();
  const [editCategory, setEditCategory] = useState<any>();

  const { loggedInUser }: any = useAppSelector((state) => state.usersSlice);

  const handleAddProductsClick = (menu: string) => {
    setSelectedMenu(menu);
  };

  const EditInitialValues: any = {
    name: editProduct?.name,
    description: editProduct?.description,
    price: editProduct?.price,
    colors: editProduct?.colors,
    modelDetails: editProduct?.modelDetails,
    spacification: editProduct?.spacification,
    discountPrice: editProduct?.discountPrice,
    category: editProduct && editProduct?.category,
    variantStockQuantities: editProduct && editProduct?.variantStockQuantities,
    totalStockQuantity: editProduct && editProduct?.totalStockQuantity,
  };

  const menuArray = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "Add Products",
      onClick: () => handleAddProductsClick("Add All Products"),
    },
    {
      key: "2",
      icon: <VideoCameraOutlined />,
      label: "Add Category",
      onClick: () => handleAddProductsClick("Add Category"),
    },
    {
      key: "3",
      icon: <RiUserSearchLine />,
      label: "SEO",
      onClick: () => handleAddProductsClick("SEO_FORM"),
    },
  ];

  useEffect(() => {
    const token = localStorage.getItem("2guysAdminToken");
    if (!token) {
      setIsLogin(false);
      return;
    }
    setIsLogin(true);
  }, []);

  useEffect(() => {
    const CategoryHandler = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllcategories`
        );
        const categories = await response.json();
        setCategory(categories);
        setLoading(false);
      } catch (err) {
        console.log("err", err);
        setLoading(false);
      }
    };

    const productHandler = async () => {
      try {
        setProductLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`
        );
        const allProducts = await response.json();
        setProducts(allProducts.products);
        setProductLoading(false);
      } catch (err) {
        console.log("error Occurred");
        setProductLoading(false);
      }
    };
    CategoryHandler();
    productHandler();
  }, [selectedMenu]);

  const tokenRemoveHandler = () => {
    const ISSERVER = typeof window === "undefined";
    !ISSERVER ? localStorage.removeItem("2guysAdminToken") : null;
    Toaster("success", "You have successfully logged out");
    setTimeout(() => {
      router.push("/dashboardlogin");
    }, 1000);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout >
      <Sider trigger={null} className={`w-full ${isVisible ? 'block' : 'hidden'}`}>
        <div className="demo-logo-vertical"  />
        <Logo className="flex justify-center mt-3 mb-3 " />
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={menuArray.map((item) => item)}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: "white" }}>
          <Button
            type="text"
            icon={isVisible ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
            onClick={() => setIsVisible(!isVisible)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          className="lg:my-[24px] lg:mx-[16px] lg:p-[24px] md:my-[24px] md:mx-[16px] md:p-[24px] p-6"
          style={{
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {isLogin ? (
            <div className="flex justify-end mb-4">
              <p
                className="w-fit underline cursor-pointer"
                onClick={tokenRemoveHandler}
              >
                Log out
              </p>
            </div>
          ) : null}

          {selectedMenu === "Add Products" ? (
            <AddProductForm
              setselecteMenu={setSelectedMenu}
              setEditProduct={setEditProduct}
              EditInitialValues={editProduct}
              EditProductValue={
                EditInitialValues.name !== undefined ||
                EditInitialValues.category !== undefined
                  ? EditInitialValues
                  : undefined
              }
            />
          ) : selectedMenu === "Add Category" ? (
            <Categories
              Categories={category}
              setCategory={setCategory}
              setselecteMenu={setSelectedMenu}
              loading={loading}
              canAddCategory={loggedInUser && loggedInUser.canAddCategory}
              canDeleteCategory={loggedInUser && loggedInUser.canDeleteCategory}
              seteditCategory={setEditCategory}
            />
          ) : selectedMenu === "Add All Products" ? (
            <Allproducts
              Categories={products}
              setCategory={setProducts}
              setselecteMenu={setSelectedMenu}
              loading={productLoading}
              canAddProduct={loggedInUser && loggedInUser.canAddProduct}
              canDeleteProduct={loggedInUser && loggedInUser.canDeleteProduct}
              setEditProduct={setEditProduct}
            />
          ) : selectedMenu === "SEO_FORM" ? (
            <SEO />
          ) : (
            <CategoryForm
              setselecteMenu={setSelectedMenu}
              seteditCategory={setEditCategory}
              editCategory={editCategory}
            />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProtectedRoute(DashboardProvider);
