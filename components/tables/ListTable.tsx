import React from 'react';

interface listTableProps {
  header: string[];
  data?: (string | number | Date | null)[][];
}

export default function ListTable({ header, data = [] }: listTableProps) {
  return (
    <div>
      <table className="table border-2">
        <thead>
          <tr className="text-lg text-black bg-gray-200 text-center">
            {header.map((item) => (
              <th key={item}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((row, index) => (
              <tr key={index} className="text-lg text-center hover">
                {row.map((item, index) => (
                  <td key={index}>{item !== null ? item.toString() : ''}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
