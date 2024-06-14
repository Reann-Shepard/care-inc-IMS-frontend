'use client';
import dataSet from '@/components/inventory/temp_inv-ovData.json';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const metadata = {
  title: 'Inventory',
};

interface CategoryData {
  name: string;
  model: string;
  quantity: string;
}

export default function InventoryOVPage() {
  const router = useRouter();
  const devices: CategoryData[] = dataSet;
  const [selectedModel, setSelectedModel] = useState<string>();

  const header = ['Company', 'Model', 'Amount'];

  const data = devices.map((device) => [
    device.name,
    device.model,
    device.quantity,
  ]);

  const getBGColor = (quantity: number) => {
    if (quantity <= 2) {
      return 'bg-red-300';
    } else if (quantity <= 5) {
      return 'bg-yellow-300';
    } else {
      return 'bg-green-300';
    }
  };

  useEffect(() => {
    if (selectedModel) {
      router.push(`/inventory_list?model=${selectedModel}`);
    }
  }, [selectedModel]);

  return (
    <div>
      <div className="flex justify-end mb-2 mr-10">
        <Link href="/inventory/add_inventory">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-12 rounded">
            +
          </button>
        </Link>
      </div>
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
              <tr
                key={index}
                className="text-lg text-center hover "
                onClick={() => setSelectedModel(row[0] + ' ' + row[1])}
              >
                {row.map((item, index) => (
                  <td key={index} className="">
                    <div
                      className={
                        (index === 2
                          ? 'w-1/12 m-auto rounded-full bg-opacity-70 border-red-300 '
                          : '') + (index === 2 ? getBGColor(Number(item)) : '')
                      }
                    >
                      {item}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
