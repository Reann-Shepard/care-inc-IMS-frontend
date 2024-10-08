'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getAllDevices } from '@/services/device/getDevice';
import { deviceToInv } from '@/services/device/deviceToInv';
import AddBtn from '@/components/buttons/AddBtn';

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

  // navigate to the detailed inventory list page for the selected model
  useEffect(() => {
    if (selectedModel) {
      router.push(`/inventory/inventory_list?model=${selectedModel}`);
    }
  }, [selectedModel, router]);

  // define the table header
  const header = ['Model', 'Amount'];

  // function to determine the background color based on the quantity
  const getBGColor = useCallback((quantity: number) => {
    if (quantity <= 2) {
      return 'bg-red-300';
    } else if (quantity <= 5) {
      return 'bg-yellow-300';
    } else {
      return 'bg-green-300';
    }
  }, []);

  // navigate to the detailed inventory list page for the selected model
  const handleRowClick = useCallback(
    (model: string) => {
      router.push(`/inventory/inventory_list?model=${model}`);
    },
    [router],
  );

  // calculate the total devices amount
  const totalDevicesAmount = devices.reduce(
    (acc, device) => acc + device.quantity,
    0,
  );

  return (
    <div>
      <div className="flex justify-end mb-2 mr-10">
        <AddBtn pathName="/inventory/add_inventory" element="Device" />
      </div>

      <div className="flex justify-between mx-24">
        <div className="w-2/3">
          {/* <table className="table border-2 min-w-full"> */}
          <table className="table border-2 min-w-full table-sm">
            <thead>
              <tr className=" text-black bg-gray-200 ">
                {header.map((item) => (
                  // <th key={item} className="py-2 px-36 w-1/2">
                  <th key={item} className="p2 text-center ">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {devices.map((device, index) => (
                <tr
                  key={index}
                  className="text-center hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleRowClick(device.model)}
                >
                  <td className="p-2 ">{device.model}</td>
                  <td className="p-2 flex items-center justify-center">
                    <div
                      className={`w-10 h-8 rounded-full bg-opacity-70 border-red-300 text-center flex items-center justify-center ${getBGColor(device.quantity)}`}
                    >
                      {device.quantity}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-1/3 flex justify-center ">
          <div className="rounded-lg border-none text-center px-20 ">
            <div className="bg-gray-100 px-6 p-3">
              <div className="text-xl font-bold">Total Devices</div>
            </div>
            <div className="text-8xl font-bold mt-12">{totalDevicesAmount}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
