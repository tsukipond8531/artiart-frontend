import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import PRODUCTS_TYPES from 'types/interfaces';

type setTotalProducts = React.Dispatch<React.SetStateAction<any[]>>;
type setTotalPage = React.Dispatch<React.SetStateAction<string | undefined>>;
type setError = React.Dispatch<React.SetStateAction<any>>;
type setLoading = React.Dispatch<React.SetStateAction<boolean>>;

export const uploadPhotosToBackend = async (files: File[]): Promise<any[]> => {
  const formData = new FormData();

  if (files.length === 0) throw new Error('No files found');

  try {
    for (const file of files) {
      formData.append('image', file);
    }

    const response: AxiosResponse<any> = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/addProductImage`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    // Handle the response from the backend
    return response.data?.productsImageUrl;
  } catch (error) {
    console.log('Error:', error);
    throw error;
  }
};

export const ImageRemoveHandler = async (
  imagePublicId: string,
  setterFunction: any,
) => {
  const requestConfig: AxiosRequestConfig = {
    data: { imageUrl: imagePublicId },
  };

  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/removeProductImage`,
      requestConfig,
    );
    console.log('Image removed successfully:', response.data);
    setterFunction([]);
  } catch (error) {
    console.error('Failed to remove image:', error);
  }
};

export const getPaginatedproducts = async (page: number) => {
  try {
    let response: any = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/getPaginateProducts?page=${page}`,
    );
    let products = response.data.products;
    let totalPages = response.data.totalPages;
    let currentPage = response.data.currentPage;
    let totalProducts = response.data.totalProducts;
    return {
      products,
      totalPages,
      currentPage,
      totalProducts,
    };
  } catch (err: any) {
    if (err.response && err.response.data && err.response.data.message) {
      throw new Error(err.response.data.message);
    } else if (err.message) {
      throw new Error(err.message);
    } else {
      throw new Error('unexpected Error occured');
    }
  }
};

export let getPRODUCTS = async (
  setTotalProducts: setTotalProducts,
  setError: setError,
  setLoading: setLoading,
  pageNumber: number,
  setTotalPage?: setTotalPage,
  setTotalProductscount?: any,
) => {
  try {
    setLoading(true);
    const { products, totalPages, currentPage, totalProducts }: any =
      await getPaginatedproducts(pageNumber);
    setTotalProducts(products);
    setTotalPage && setTotalPage(totalPages);
    setTotalProductscount && setTotalProductscount(totalProducts);
  } catch (err: any) {
    console.log(err, 'err');
    if (err.response && err.response.data && err.response.data.message) {
      setError(err.response.data.message);
    } else if (err.message) {
      setError(err.message);
    } else {
      setError('An unexpected error occurred.');
    }
  } finally {
    setLoading(false);
  }
};
