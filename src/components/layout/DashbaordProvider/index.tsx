"use client";
import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import Logo from "components/Common/Logo";
import AddProductForm from "components/AddProducts/Products";
import Allproducts from "components/AddProducts/Allproducts";
import CategoryForm from "components/AddCategory/Products";
import Categories from "components/AddCategory/Category";

const DashboardProvider = ({ children }: any) => {
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [selecteMenu, setselecteMenu] = useState<string>("Add All Products");
  const [category, setCategory] = useState<any[]>();
  const [products, setProducts] = useState<any[]>();

  const handleAddProductsClick = (menu: string) => {
    setselecteMenu(menu);
  };

  const menuArray = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "Add Products",
      onClick: () => handleAddProductsClick("Add Products"),
    },
    {
      key: "2",
      icon: <VideoCameraOutlined />,
      label: "Add Category",
      onClick: () => handleAddProductsClick("Add Category"),
    },
    {
      key: "3",
      icon: <UploadOutlined />,
      label: "nav 3",
    },
  ];



  useEffect(() => {
    const CategoryHandler = async () => {
      const response = await fetch(
        "https://artiart-server-phi.vercel.app/api/getAllcategories"
      );
      const Categories = await response.json();
      setCategory(Categories);
    };
  
    const productHandler = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`
      );
      const Allproducts = await response.json();
      setProducts(Allproducts.products);
    };
    CategoryHandler();
    productHandler();
  }, [selecteMenu]);
  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="w-full"
      >
        <div className="demo-logo-vertical" />
        <Logo className="flex justify-center mt-3 mb-3" />
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
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {selecteMenu == "Add Products" ? (
            <AddProductForm setselecteMenu={setselecteMenu} />
          ) : selecteMenu == "Add Category" ? (
            <Categories
              Categories={category}
              setCategory={setCategory}
              setselecteMenu={setselecteMenu}
            />
          ) : selecteMenu === "Add All Products" ? (
            <Allproducts
              Categories={products}
              setCategory={setProducts}
              setselecteMenu={setselecteMenu}
            />
          ) : (
            <CategoryForm setselecteMenu={setselecteMenu} />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardProvider;
