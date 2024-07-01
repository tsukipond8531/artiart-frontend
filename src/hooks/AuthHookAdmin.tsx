'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loader from 'components/Loader/Loader';
import { useAppDispatch } from 'components/Others/HelperRedux';
import { loggedInUserAction } from '../redux/slices/AdminsSlice';
import axios from 'axios';
import { headers } from 'next/headers';

function ProtectedRoute(WrappedComponent: any) {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useAppDispatch();
    const AddminProfileTriggerHandler = async (token: string) => {
      try {
        let user: any = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/admins/getAdminHandler`,
          {
            headers: {
              token: token,
            },
          },
        );

        console.log(user.data, 'user token');
        dispatch(loggedInUserAction(user.data.user));
      } catch (err: any) {
        console.log(err, 'err');
      }
    };

    useEffect(() => {
      let token = localStorage.getItem('2guysAdminToken');
      console.log(token, 'token');

      if (!token) {
        router.push('/dashboardlogin');
      } else {
        AddminProfileTriggerHandler(token);
        setLoading(false);
      }
    }, [router]);

    if (loading) {
      return (
        <div
          style={{
            background: '#FFF',
            zIndex: 1111,
            alignItems: 'center',
            display: 'flex',
            height: '100vh',
            width: '-webkit-fill-available',
            justifyContent: 'center',
          }}
        >
          <Loader />
        </div>
      );
    } else {
      return <WrappedComponent {...props} />;
    }
  };

  return Wrapper;
}

export default ProtectedRoute;
