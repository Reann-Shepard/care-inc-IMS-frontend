'use client';

import React from 'react';
interface InventoryListProps {
  data: { color: string; type: string; SN: string; model: string }[];
}

export default function InventoryList({ data }: InventoryListProps) {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table border-2">
          <thead>
            <tr className="text-lg text-black bg-gray-200 text-center">
              <th>Color</th>
              <th>Device Type</th>
              <th>Serial Number</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={index} className="text-lg text-center hover">
                <td>{item.color}</td>
                <td>{item.type}</td>
                <td>{item.SN}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
