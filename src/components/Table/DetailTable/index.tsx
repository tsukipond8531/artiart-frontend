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
        {keypoint.map((array, index) => {
          let boldFlag = index == 0;

          return (
            <tr className={'hover:bg-gray-100 '} key={index}>
              <td
                className={`px-6 py-4 whitespace-wrap ${boldFlag ? 'text-sm font-bold whitespace-nowrap' : 'whitespace-wrap'}  text-black border`}
              >
                {array.name}
              </td>
              <td
                className={`px-6 py-4  ${boldFlag ? 'text-sm font-bold whitespace-nowrap' : 'whitespace-wrap'}  text-black border w-full`}
              >
                {array.detail}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DetailTable;
