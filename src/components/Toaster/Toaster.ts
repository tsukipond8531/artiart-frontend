import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface PROPS {}
type ToastMethod = 'success' | 'error' | 'info' | 'warn';
export default function showToast(ToastType: ToastMethod, message: string) {
  console.log('function called');
  toast[ToastType](message, {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });
}
