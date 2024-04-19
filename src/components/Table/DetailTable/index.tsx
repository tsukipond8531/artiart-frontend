import React from 'react';

// Define the type for each object in the keypoint array
interface KeyPoint {
  name: string;
  detail: string;
}

// Define the prop types for the DetailTable component
interface DetailTableProps {
  keypoint: KeyPoint[];
}

const DetailTable: React.FC<DetailTableProps> = ({ keypoint }) => {
  return (
    <table className="min-w-full w-full divide-y divide-gray-200">
      <tbody className="divide-y divide-gray-200">
        {keypoint.map((array, index) => (
          <tr className="hover:bg-gray-100" key={index}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-normal text-black">
              {array.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
              {array.detail}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DetailTable;
