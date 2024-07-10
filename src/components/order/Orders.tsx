'use client'

import axios from 'axios';
import Loader from 'components/Loader/Loader';
import ProtectedRoute from 'hooks/AuthHookAdmin';
import { useEffect, useState } from 'react';
import { LiaEdit } from 'react-icons/lia';

import { Table } from 'antd';


function Orders() {
    const [orders, setOrders] = useState<any[]>([])
    const [orderLoading, setorderLoading] = useState(false)


    const columns = [
        {
          title: 'Order Id',
          dataIndex: 'order_id',
          key: 'order_id',
    
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
      
          },
          {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
      
          },
        {
          title: 'Name',
          dataIndex: 'first_name',
          key: 'name',
          render: (text: any, record: any) => {
            const Name =record.first_name + " " + record.last_name

            return <span>{Name}</span>;
          },
        },
        {
            title: 'Payement Status',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
            render: (text: any, record: any) => {
                const paymentStatus =record.paymentStatus ? "true" : "false"
    
                return <span>{paymentStatus}</span>;
              },
          },

          {
            title: 'Checkout Status',
            dataIndex: 'checkout',
            key: 'checkout',

            render: (text: any, record: any) => {
                const checkout =record.checkout ? "true" : "false"
    
                return <span>{checkout}</span>;
              },
          
          },


        {
            title: 'Amount ',
        dataIndex: 'amount_cents',
        key: 'amount_cents',
            render: (text: any, record: any) => {
          let Transaction =     record.amount_cents ? (record.amount_cents / 100).toFixed(2)  : "Amount Available"
      
            const amountInDollars = (record.amount / 100).toFixed(2);
       
              return <span>{Transaction}</span>;
            },
          },
        {
            title: 'Transaction ID',
        dataIndex: 'transactionId',
        key: 'transactionId',
            render: (text: any, record: any) => {
          let Transaction =     record.transactionId ? record.transactionId  : "ID Not Available"
          
              return <span>{Transaction}</span>;
            },
          },
        {
          title: 'Creation Date',
          dataIndex: 'createdAt',
          key: 'date',
          render: (text: any, record: any) => {
            const createdAt = new Date(record.createdAt);
            const formattedDate = `${createdAt.getFullYear()}-${String(
              createdAt.getMonth() + 1,
            ).padStart(2, '0')}-${String(createdAt.getDate()).padStart(2, '0')}`;
            return <span>{formattedDate}</span>;
          },
        },
        {
          title: 'Creation Time',
          dataIndex: 'createdAt',
          key: 'time',
          render: (text: any, record: any) => {
            const createdAt = new Date(record.createdAt);
            const formattedTime = `${String(createdAt.getHours()).padStart(
              2,
              '0',
            )}:${String(createdAt.getMinutes()).padStart(2, '0')}
      
            `;
            return <span>{formattedTime}</span>;
          },
        },


        {
            title: 'Payement Date',
            dataIndex: 'transactoinDate',
            key: 'date',
            render: (text: any, record: any) => {
              const createdAt = new Date(record.transactionDate);
              const formattedDate = `${createdAt.getFullYear()}-${String(
                createdAt.getMonth() + 1,
              ).padStart(2, '0')}-${String(createdAt.getDate()).padStart(2, '0')}`;
              return <span>{formattedDate}</span>;
            },
          },

    
       

      ];
    

const getAllOrder = async()=>{
    const token = localStorage.getItem('2guysAdminToken');
    if(!token)return
    const transactionIdColumn = {
        title: 'Transaction ID',
        dataIndex: 'transactionId',
        key: 'transactionId',
    };

        try {
            setorderLoading(true);
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/admins/getAllorders`,{
                headers:{
                    token:token
                }
            }
          );
          response.data.Orders
        
              setOrders(  response.data.Orders);
          console.log(  response.data.Orders , "  response.data.Orders")
          if (response.data.Orders.some((order:any) => order.transactionId)) {
            
            columns.push(transactionIdColumn);
        }
        } catch (error) {
          console.log('Error fetching data:', error);
        } finally {
            setorderLoading(false);
        }
      
}
    useEffect(()=>{
        getAllOrder()
    },[])
  return (
    <div>
        <button onClick={getAllOrder}>getAllOrder</button>
      {orderLoading ? (
        <div className="flex justify-center mt-10">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex justify-between mb-4 items-center">
            <p>Orders</p>
    
          </div>
          {orders && orders.length > 0 ? (
            <Table
              className="lg:overfow-x-auto overflow-auto"
              dataSource={orders}
              columns={columns}
              pagination={false}
              rowKey="_id"
            />
          ) : (
            'No Orders found found'
          )}
        </>
      )}
    </div>
  )
}

export default ProtectedRoute(Orders)