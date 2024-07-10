/**
 * Inventory Overview Page Component.
 *
 * This component fetches and displays categorized inventory data based on device models.
 * It allows navigation to detailed inventory lists and provides a link to add new inventory items.
 */

'use client';
import Link from 'next/link'; // import Link from 'next/link' for client-side navigation
import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation'; // import hooks for accessing url search parameters and navigation
import { getAllDevices } from '@/services/device/getDevice'; // import function to fetch all devices
import { deviceToInv } from './deviceToInv'; // import function to transform device data to inventory data

export const metadata = {
  title: 'Inventory',
};

interface CategoryData {
  model: string;
  quantity: number;
}

export default function InventoryOVPage() {
  const router = useRouter(); // initialize the router object
  const [devices, setDevices] = useState<CategoryData[]>([]); // initialize the state for categorized inventory data
  const searchParams = useSearchParams(); // initialize the searchParams object to access url search parameters
  const selectedModel = searchParams.get('model'); // extract the selected model from the url search parameters

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const data = await getAllDevices(); // fetch all devices from the database
        const invData = await deviceToInv(data); // convert device data to inventory data format using the deviceToInv function
        const modelCounts: { [key: string]: number } = {}; // initialize an object to store model counts

        invData.forEach((device) => {
          modelCounts[device.model] = (modelCounts[device.model] || 0) + 1;
        });

        const categorizedData = Object.keys(modelCounts).map((model) => ({
          model,
          quantity: modelCounts[model], // create an array of objects with model and quantity properties
        }));

        setDevices(categorizedData); // set the state with the categorized inventory data
      } catch (error) {
        console.error('Error fetching devices', error); // log an error message if fetching devices fails
      }
    };

    fetchDevices(); // Fetching devices when the component mounts
  }, []);

  useEffect(() => {
    if (selectedModel) {
      router.push(`/inventory_list?model=${selectedModel}`); // navigate to the detailed inventory list page for the selected model
    }
  }, [selectedModel, router]);

  const header = ['Model', 'Amount']; // define the table header

  const getBGColor = useCallback((quantity: number) => {
    // function to determine the background color based on the quantity
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
      router.push(`/inventory_list?model=${model}`); // navigate to the detailed inventory list page for the selected model
    },
    [router],
  );

  return (
    <div>
      <div className="flex justify-end mb-2 mr-10">
        <Link
          href="/inventory/add_inventory"
          className="btn px-10 font-bold text-white bg-[#54CE50]"
        >
          +
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
