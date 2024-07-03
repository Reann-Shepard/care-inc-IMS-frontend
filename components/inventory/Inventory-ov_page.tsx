'use client';
import Link from 'next/link';
import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getAllDevices } from '@/services/device/getDevice';
import { deviceToInv } from './deviceToInv';

export const metadata = {
  title: 'Inventory',
};

interface CategoryData {
  model: string;
  quantity: number;
}

export default function InventoryOVPage() {
  const router = useRouter();
  const [devices, setDevices] = useState<CategoryData[]>([]);
  const searchParams = useSearchParams();
  const selectedModel = searchParams.get('model');

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const data = await getAllDevices();
        const invData = await deviceToInv(data);
        const modelCounts: { [key: string]: number } = {};

        // invData.forEach((device) => {
        //   if (modelCounts[device.model]) {
        //     modelCounts[device.model]++;
        //   } else {
        //     modelCounts[device.model] = 1;
        //   }
        // });

        invData.forEach((device) => {
          modelCounts[device.model] = (modelCounts[device.model] || 0) + 1;
        });

        const categorizedData = Object.keys(modelCounts).map((model) => ({
          model,
          quantity: modelCounts[model],
        }));

        setDevices(categorizedData);
      } catch (error) {
        console.error('Error fetching devices', error);
      }
    };

    fetchDevices();
  }, []);

  useEffect(() => {
    if (selectedModel) {
      router.push(`/inventory_list?model=${selectedModel}`);
    }
  }, [selectedModel, router]);

  const header = ['Model', 'Amount'];

  const getBGColor = useCallback((quantity: number) => {
    if (quantity <= 2) {
      return 'bg-red-300';
    } else if (quantity <= 5) {
      return 'bg-yellow-300';
    } else {
      return 'bg-green-300';
    }
  }, []);

  const handleRowClick = useCallback(
    (model: string) => {
      router.push(`/inventory_list?model=${model}`);
    },
    [router],
  );

  return (
    <div>
      <div className="flex justify-end mb-2 mr-10">
        <Link href="/inventory/add_inventory">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-12 rounded">
            +
          </button>
        </Link>
      </div>

      <div className="flex justify-center">
        <table className="table border-2 min-w-full">
          <thead>
            <tr className="text-lg text-black bg-gray-200 text-center">
              {header.map((item) => (
                <th key={item} className="py-2">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {devices.map((device, index) => (
              <tr
                key={index}
                className="text-lg text-center hover:bg-gray-100 cursor-pointer"
                onClick={() => handleRowClick(device.model)}
              >
                <td className="py-2 text-center w-1/2">{device.model}</td>
                <td className="py-2 text-center w-1/2">
                  <div
                    className={`inline-block w-10 h-8 rounded-full bg-opacity-70 border-red-300 ${getBGColor(device.quantity)}`}
                  >
                    {device.quantity}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
