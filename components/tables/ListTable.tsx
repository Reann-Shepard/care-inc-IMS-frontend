import React from 'react';
interface listTableProps {
  header: string[];
  data?: (string | number | Date | null)[][];
  onClick: (row: string | number | Date | null) => void;
}

export default function ListTable({
  header,
  data = [],
  onClick,
}: listTableProps) {
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
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="text-lg text-center hover"
                onClick={() => onClick(row[0])}
              >
                {row.map((item, colIndex) => (
                  <td key={colIndex}>{item !== null ? item.toString() : ''}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
