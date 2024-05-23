import React from 'react';
interface CardProps {
  title: string;
  data?: { name: string; count?: number }[];
}

export default async function Card({ title, data }: CardProps) {
  return (
    <div className="w-72 m-10 border border-black rounded-xl p-4">
      <div
        className="text-xl font-bold p-2"
        style={{ backgroundColor: '#FFB931' }}
      >
        {title}
      </div>
      <div>
        {data?.map((item, index) => (
          <div key={index} className="flex justify-between mt-1">
            <div className="text-lg">{item.name}</div>
            <div className="text-lg">{item.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// export default async function Card({ title, data }: CardProps) {
//   return (
//     <div className='p2 w-96 rounded-lg border-4 border-black justify-self-center'>
//       <div className='flex flex-col'>
//         <div className='rounded-t-md px-6 pt-4 bg-amber-300 font-bold text-lg mb-2'>
//           {title}
//         </div>
//         <div className='flex flex-col px-3 py-3'>
//           {data?.map((item, index) => (
//             <div key={index} className='flex justify-between items-center'>
//               <div className='pl-3'>{item.name}</div>
//               <div className='pr-3'>{item.count}</div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }
