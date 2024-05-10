"use client";
import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import Logo from "components/Common/Logo";
import AddProductForm from "components/AddProducts/Products";
import Allproducts from "components/AddProducts/Allproducts";
import CategoryForm from "components/AddCategory/Products";
import Categories from "components/AddCategory/Category";
import {useAppSelector } from "components/Others/HelperRedux";
import Toaster from "components/Toaster/Toaster";
import { useRouter } from "next/navigation";
import ProtectedRoute from "hooks/AuthHookAdmin";
import {Product, ProductWithImages} from 'types/interfaces'


const DashboardProvider = ({ children }: any) => {
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [selecteMenu, setselecteMenu] = useState<string>("Add All Products");
  const [category, setCategory] = useState<any[]>();
  const [products, setProducts] = useState<any[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [productloading, setProductloading] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean | null | undefined>(false);
  const router = useRouter()
  const [editProduct, setEditProduct] = useState<ProductWithImages | undefined>()
  const [editCategory, seteditCategory] = useState<any>()

  


   const { loggedInUser }:any = useAppSelector(state => state.usersSlice);

  const handleAddProductsClick = (menu: string) => {
    setselecteMenu(menu);
  };
 

  console.log(editCategory, "editCategory")
 const EditInitialValues: any = {
    name: editProduct?.name,
    description: editProduct?.description,
    price: editProduct?.price,
    colors: editProduct?.colors,
    modelDetails: editProduct?.modelDetails,
    spacification: editProduct?.spacification,
    discountPrice: editProduct?.discountPrice,
    category: editProduct && editProduct?.category
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
  ];

  
  useEffect(()=>{
    const token = localStorage.getItem("2guysAdminToken");
    if (!token) {
      setIsLogin(false)
      return;
    }
    setIsLogin(true)
  },[])


  useEffect(() => {
    const CategoryHandler = async () => {
try{
  setLoading(true)
  const response = await fetch(
    "https://artiart-server-phi.vercel.app/api/getAllcategories"
  );
  const Categories = await response.json();
  setCategory(Categories);
  setLoading(false)

}catch(err){
console.log('err', err)
  setLoading(false)


}

    };
  
    const productHandler = async () => {
      try{
        setProductloading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getAllproducts`);
        const Allproducts = await response.json();
        setProducts(Allproducts.products);

        setProductloading(false)

      }catch(err){
console.log("error Occured")
setProductloading(false)
      }

    };
    CategoryHandler();
    productHandler();
  }, [selecteMenu]);

  const tokenRemoveHandler = ()=>{
    const ISSERVER = typeof window === "undefined"
    !ISSERVER ? localStorage.removeItem("2guysAdminToken") : null
      Toaster("success", "You have sucessfully logout")
      setTimeout(()=>{
      router.push("/dashboardlogin");
  
      },1000)
    }
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
       {isLogin ? <div className="flex justify-end mb-4"><p className=" w-fit underline cursor-pointer" onClick={()=>{tokenRemoveHandler()}}>log out</p></div> : null} 

          {selecteMenu == "Add Products" ? (
            <AddProductForm setselecteMenu={setselecteMenu} setEditProduct={setEditProduct} EditInitialValues={editProduct} EditProductValue={EditInitialValues.name !== undefined  || EditInitialValues.category !== undefined   ? EditInitialValues : undefined }/>
          ) : selecteMenu == "Add Category" ? (
            <Categories
              Categories={category}
              setCategory={setCategory}
              setselecteMenu={setselecteMenu}
              loading={loading}
              canAddCategory={loggedInUser && loggedInUser.canAddCategory}
              canDeleteCategory={ loggedInUser && loggedInUser.canDeleteCategory}
              seteditCategory={seteditCategory} 


            />
          ) : selecteMenu === "Add All Products" ? (
            <Allproducts
              Categories={products}
              setCategory={setProducts}
              setselecteMenu={setselecteMenu}
              loading={productloading}
              canAddProduct={loggedInUser && loggedInUser.canAddProduct}
              canDeleteProduct={loggedInUser && loggedInUser.canDeleteProduct}
              setEditProduct={setEditProduct}

            />
          ) : (
            <CategoryForm setselecteMenu={setselecteMenu} seteditCategory={seteditCategory} editCategory={editCategory} />
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProtectedRoute(DashboardProvider);
