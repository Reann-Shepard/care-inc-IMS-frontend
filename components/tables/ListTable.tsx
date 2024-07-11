import React from 'react';
interface listTableProps {
  header: string[];
  data?: (string | number | Date | null)[][];
  onClick?: (row: (string | number | Date | null)[]) => void;
}

export default function ListTable({
  header,
  data = [],
  onClick = () => {},
}: listTableProps) {
  return (
    <div>
      <table className="table table-sm border-2">
        <thead>
          <tr className="text-black text-sm bg-gray-200 text-center">
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
                className="text-center hover"
                onClick={() => onClick(row)}
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
