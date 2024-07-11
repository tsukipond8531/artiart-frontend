'use client'

import axios from 'axios';
import Loader from 'components/Loader/Loader';
import ProtectedRoute from 'hooks/AuthHookAdmin';
import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { TbTruckDelivery } from 'react-icons/tb';


function Orders() {
  const [orders, setOrders] = useState<any[]>([])
  const [orderLoading, setorderLoading] = useState(false)
console.log(process.env.NEXT_PUBLIC_fenix_baseUrl, "process.env.NEXT_PUBLIC_fenix_baseUrl")

const deliveryCreateHandler =async()=>{
  let tokenbody = {
    client_id : process.env.NEXT_PUBLIC_fenix_fenix_client_id,
    client_secret : process.env.NEXT_PUBLIC_fenix_fenix_client_secret,
    grant_type : process.env.NEXT_PUBLIC_fenix_grant_type
  }
let authentication_response = await axios.post(`${process.env.NEXT_PUBLIC_fenix_baseUrl}/user/token`,tokenbody);

console.log(authentication_response, "authentication_response")

}

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
        const Name = record.first_name + " " + record.last_name

        return <span>{Name}</span>;
      },
    },
    {
      title: 'Payement Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (text: any, record: any) => {
        const paymentStatus = record.paymentStatus ? "true" : "false"

        return <span>{paymentStatus}</span>;
      },
    },

    {
      title: 'Checkout Status',
      dataIndex: 'checkout',
      key: 'checkout',

      render: (text: any, record: any) => {
        const checkout = record.checkout ? "true" : "false"

        return <span>{checkout}</span>;
      },

    },


    {
      title: 'Amount ',
      dataIndex: 'amount_cents',
      key: 'amount_cents',
      render: (text: any, record: any) => {
        let Transaction = record.amount_cents ? (record.amount_cents / 100).toFixed(2) : "Amount Available"

        const amountInDollars = (record.amount / 100).toFixed(2);

        return <span>{Transaction}</span>;
      },
    },
    {
      title: 'Transaction ID',
      dataIndex: 'transactionId',
      key: 'transactionId',
      render: (text: any, record: any) => {
        let Transaction = record.transactionId ? record.transactionId : "ID Not Available"

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

        let formattedDate;
        if (record.transactionDate) {
          let createdAt = new Date(record.transactionDate);
          formattedDate = `${createdAt.getFullYear()}-${String(
            createdAt.getMonth() + 1,
          ).padStart(2, '0')}-${String(createdAt.getDate()).padStart(2, '0')}`;

        }
        else {
          formattedDate = "Transaction Not Available"
        }


        return <span>{formattedDate}</span>;
      },
    },


    {
      title: 'Create Devliery Order',
      dataIndex: 'transactionDate',
      key: 'transactionDate',
      render: (text: any, record: any) => {

      return <span><TbTruckDelivery onClick={deliveryCreateHandler} className='cursor-pointer text-cyan-500' size={30}/></span>
      },
    },




  ];


  const getAllOrder = async () => {
    const token = localStorage.getItem('2guysAdminToken');
    if (!token) return
    const transactionIdColumn = {
      title: 'Transaction ID',
      dataIndex: 'transactionId',
      key: 'transactionId',
    };

    try {
      setorderLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admins/getAllorders`, {
        headers: {
          token: token
        }
      }
      );
      response.data.Orders

      setOrders(response.data.Orders);
      console.log(response.data.Orders, "  response.data.Orders")
      if (response.data.Orders.some((order: any) => order.transactionId)) {

        columns.push(transactionIdColumn);
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setorderLoading(false);
    }

  }
  useEffect(() => {
    getAllOrder()
  }, [])
  return (
    <div>
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
              className="lg:overfow-x-auto overflow-auto border-slate-100"
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