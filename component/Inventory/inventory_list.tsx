'use client';

import React from 'react';
interface InventoryListProps {
  data: { color: string; type: string; SN: string }[];
}

export default function InventoryList({ data }: InventoryListProps) {
  return (
    <div>
      <div>
        {data?.map((item, index) => (
          <div
            key={index}
            className="w-full h-10 px-5 bg-gray-100 my-3 flex items-center border-b-2 border-gray-300"
          >
            <div className="text-l mr-20 w-1/6">{item.color}</div>
            <div className="text-l mr-20 w-1/6">{item.type}</div>
            <div className="text-l w-1/6">{item.SN}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
