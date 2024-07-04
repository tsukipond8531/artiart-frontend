import { HeadingH3, HeadingH6 } from 'components/Common/Heading';
import { Para14 } from 'components/Common/Paragraph';
import React, { useState } from 'react';
import { Rate } from 'antd';
import Input from 'components/Common/Input';
import { IoIosSend } from 'react-icons/io';
import feedback from "../../../../public/assets/images/review.png";
import Image from 'next/image';
import Pagination from 'components/Common/Pagination';

interface UserReview {
  name: string;
  star: number;
  description: string;
}

const UsersView: UserReview[] = [
  { name: 'John Doe', star: 4, description: 'Great service!' },
  { name: 'Jane Smith', star: 5, description: 'Highly recommend!' },
  { name: 'John Doe', star: 4, description: 'Great service!' },
  { name: 'Jane Smith', star: 5, description: 'Highly recommend!' },
  { name: 'Jane Smith', star: 5, description: 'Highly recommend!' },
  { name: 'John Doe', star: 4, description: 'Great service!' },
  { name: 'Jane Smith', star: 5, description: 'Highly recommend!' },
];

const ITEMS_PER_PAGE = 4;

const Review: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(UsersView.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentItems = UsersView.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="flex flex-wrap md:flex-nowrap justify-between md:gap-8">
      <div className="w-full md:w-4/6">
        {currentItems.map((array, index) => (
          <div className="space-y-2 rounded-md p-2 mt-4 shadow" key={index}>
            <div className="flex items-center gap-2">
              <Image src={feedback} width={50} height={50} alt="feedback" />
              <div>
                <HeadingH6 title={array.name} />
                <Rate className='reviewstar' disabled defaultValue={array.star} />
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
      </div>
      <div className="w-full md:w-2/6">
        <div className="bg-primary p-2 md:p-4 space-y-3">
          <HeadingH3 title={"Add A Review"} />
          <Para14 title={"Your Email Address Will Not Be Published. Required Fields Are Marked *"} />
          <Rate />
          <form className="space-y-3">
            <Input type="text" name="Your Name *" placeholder="Your Name *" />
            <Input type="email" name="Your Email Address " placeholder="Your Email Address *" />
            <Input type="text" name="Your Name *" placeholder="Your Name *" />
            <textarea className="peer p-4 block w-full border rounded-md border-gray-200 text-sm placeholder:text-slate-400 disabled:opacity-50 disabled:pointer-events-none autofill:pb-2" placeholder="Your Review *" />
            <button className="bg-black text-white py-3 px-4 rounded-none flex items-center gap-2">
              <IoIosSend size={25} /> Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Review;
