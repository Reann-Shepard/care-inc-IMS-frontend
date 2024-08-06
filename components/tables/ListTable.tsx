// import React from 'react';
// interface listTableProps {
//   header: string[];
//   data?: (string | number | Date | null)[][];
//   onClick?: (row: (string | number | Date | null)[]) => void;
// }

// export default function ListTable({
//   header,
//   data = [],
//   onClick = () => { },
// }: listTableProps) {
//   return (
//     <div>
//       <table className="table table-sm border-2">
//         <thead>
//           <tr className="text-black text-sm bg-gray-200 text-center">
//             {header.map((item) => (
//               <th key={item}>{item}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data &&
//             data.map((row, rowIndex) => (
//               <tr
//                 key={rowIndex}
//                 className="text-center hover"
//                 onClick={() => onClick(row)}
//               >
//                 {row.map((item, colIndex) => (
//                   <td key={colIndex}>
//                     {item !== null ? item.toString() : ''}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// import React from 'react';

// interface ListTableProps {
//   header: string[];
//   data?: (string | number | Date | JSX.Element | null)[][]; // Allow JSX.Element in data
//   onClick?: (row: (string | number | Date | JSX.Element | null)[]) => void;
// }

// export default function ListTable({
//   header,
//   data = [],
//   onClick = () => { },
// }: ListTableProps) {
//   return (
//     <div>
//       <table className="table table-sm border-2 w-full">
//         <thead>
//           <tr className="text-black text-sm bg-gray-200 text-center">
//             {header.map((item) => (
//               <th key={item} className="p-2">
//                 {item}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data &&
//             data.map((row, rowIndex) => (
//               <tr
//                 key={rowIndex}
//                 className="text-center hover:bg-gray-100 cursor-pointer"
//                 onClick={() => onClick(row)}
//               >
//                 {row.map((item, colIndex) => (
//                   <td key={colIndex} className="p-2">
//                     {item !== null ? item.toString() : ''} {/* Render JSX or text */}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import React from 'react';

interface ListTableProps {
  header: string[];
  data?: (string | number | Date | null)[][];
  onClick?: (row: (string | number | Date | null)[]) => void;
}

export default function ListTable({
  header,
  data = [],
  onClick = () => {},
}: ListTableProps) {
  return (
    <div>
      <table className="table table-sm border-2 w-full">
        <thead>
          <tr className="text-black text-sm bg-gray-200 text-center">
            {header.map((item) => (
              <th key={item} className="p-2">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="text-center hover:bg-gray-100 cursor-pointer"
                onClick={() => onClick(row)}
              >
                {row.map((item, colIndex) => (
                  <td key={colIndex} className="p-2">
                    {header[colIndex] === 'Package' && item === 'Yes' ? (
                      <span className="w-7 h-4 rounded-full bg-red-500 inline-block"></span>
                    ) : item !== null ? (
                      item.toString()
                    ) : (
                      ''
                    )}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
