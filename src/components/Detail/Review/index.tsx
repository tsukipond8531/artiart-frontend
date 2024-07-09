import React, { useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { HeadingH3, HeadingH6 } from 'components/Common/Heading';
import { Para14 } from 'components/Common/Paragraph';
import { message, Rate } from 'antd';
import Input from 'components/Common/Input';
import { IoIosSend } from 'react-icons/io';
import feedback from "../../../../public/assets/images/review.png";
import Image from 'next/image';
import axios from 'axios';
import Pagination from 'components/Common/Pagination';
import Loader from 'components/Loader/Loader';

const ITEMS_PER_PAGE = 4;

const Review: React.FC = ({ reviews, productId, fetchReviews }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    productId: productId,
    name: '',
    email:'',
    description: '',
    star: 0,
  });
  const [loading, setLoading] = useState(false); // State to manage loading

  const totalPages = Math.ceil(reviews.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentItems = reviews.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStarChange = (value: number) => {
    setFormData({ ...formData, star: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form submission starts
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews/addReview`, formData);
      message.success('Review submitted successfully!');
      console.log(response.data);
      setFormData({
        productId: productId,
        name: '',
        email:'',
        description: '',
        star: 0,
      });
      // Fetch updated reviews after successful submission
      fetchReviews();
    } catch (error) {
      message.error("Error submitting the form:");
    } finally {
      setLoading(false); // Set loading to false when form submission ends
    }
  };

  return (
    <div className="flex flex-wrap md:flex-nowrap justify-between md:gap-8">
      <div className="w-full md:w-4/6">
        {currentItems.length > 0 ? (
          <>
            {currentItems.map((array: any, index: any) => (
              <div className="space-y-2 rounded-md p-2 mt-4 shadow" key={index}>
                <div className="flex items-center gap-2">
                  <Image src={feedback} width={50} height={50} alt="feedback" />
                  <div>
                    <HeadingH6 title={array.name} />
                    <Rate className='reviewstar' disabled value={array.star} />
                  </div>
                </div>
                <Para14 title={array.description} />
              </div>
            ))}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <>
            There Is No Reviews Available
          </>
        )}
      </div>
      <div className="w-full md:w-2/6">
        <div className="bg-primary p-2 md:p-4 space-y-3">
          <HeadingH3 title={"Add A Review"} />
          <Para14 title={"Your Email Address Will Not Be Published. Required Fields Are Marked *"} />
          <Rate onChange={handleStarChange} value={formData.star} />

          <form className="space-y-3" onSubmit={handleSubmit}>
            <Input type="text" name="name" placeholder="Your Name *" value={formData.name} onChange={handleChange} />
            <Input type="text" name="email" placeholder="Your Email *" value={formData.email} onChange={handleChange} />
            <textarea className="peer p-4 block w-full border rounded-md border-gray-200 text-sm placeholder:text-slate-400 disabled:opacity-50 disabled:pointer-events-none autofill:pb-2" placeholder="Your Review *" name="description" value={formData.description} onChange={handleChange} />
            <button 
              type="submit"
              className="bg-black text-white py-3 px-4 rounded-none flex items-center gap-2"
              disabled={loading} // Disable button when loading
            >
              {loading ? <Loader color="#00000" /> : <><IoIosSend size={25} /> Submit Review</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Review;
