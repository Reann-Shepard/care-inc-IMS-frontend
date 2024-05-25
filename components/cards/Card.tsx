import React from 'react';
interface CardProps {
  title: string;
  data?: { name: string; count?: number }[];
}

export default async function Card({ title, data }: CardProps) {
  return (
    <div className="w-80 m-10 border-4 border-black rounded-xl">
      <div className="text-xl font-bold p-4 rounded-t-lg bg-[#FFB931]">
        {title}
      </div>
      <div className="border-t-black mb-2">
        {data?.map((item, index) => (
          <div key={index} className="flex justify-between mt-1 px-4">
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
