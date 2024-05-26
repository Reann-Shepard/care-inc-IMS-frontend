'use client';

import React from 'react';
interface InventoryProps {
  data: { name: string; model: string; quantity: number }[];
}

export default function Inventory({ data }: InventoryProps) {
  const getBGColor = (quantity: number) => {
    if (quantity <= 2) {
      return 'bg-red-300';
    } else if (quantity <= 5) {
      return 'bg-yellow-300';
    } else {
      return 'bg-green-300';
    }
  };

  return (
    <div>
      <div>
        {data?.map((item, index) => (
          <div
            key={index}
            className="w-full h-10 px-5 bg-gray-100 my-3 flex items-center border-b-2 border-gray-300"
          >
            <div className="text-l mr-20 w-1/6">{item.name}</div>
            <div className="text-l mr-20 w-1/6">{item.model}</div>
            <div className="text-l w-1/6">
              <span
                className={`${getBGColor(item.quantity)} px-2 py-1 rounded`}
              >
                {item.quantity}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
