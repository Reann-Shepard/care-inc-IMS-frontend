'use client';

import Inventory from '@/component/Inventory/inventory_list';
import { useState } from 'react';

interface CategoryData {
  color: string;
  type: string;
  SN: string;
}

export default function InventoryPage() {
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [devices, setDevices] = useState<CategoryData[]>([
    {
      color: 'Chroma Beige',
      type: 'Left Hearing Aid',
      SN: 'B60532',
    },

    {
      color: 'Chroma Beige',
      type: 'Left Hearing Aid',
      SN: 'B6053W',
    },

    {
      color: 'Silver Grey',
      type: 'Left Hearing Aid',
      SN: 'B6TPPT',
    },

    {
      color: 'Silver Grey',
      type: 'Left Hearing Aid',
      SN: 'B6TR3F',
    },
  ]);

  // Sorting Function
  const handleSort = (sortBy: keyof CategoryData) => {
    const sortedDevices = [...devices].sort((a, b) =>
      a[sortBy].localeCompare(b[sortBy]),
    );
    setDevices(sortedDevices);
  };

  // Filtering Function
  const handleFilter = (filterBy: keyof CategoryData, filterValue: string) => {
    const filteredDevices = devices.filter(
      (device) => device[filterBy] === filterValue,
    );
    setDevices(filteredDevices);
  };

  // Handle Model Change
  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    const filteredDevices = devices.filter((device) =>
      device.type.includes(model),
    );
    setDevices(filteredDevices);
  };

  return (
    <div>
      <div className="text-2xl font-bold">Nav bar</div>
      <div className="flex justify-between items-center my-10 mb-5 mx-5">
        <div className="flex space-x-4">
          <div>
            <label htmlFor="sort" className="mr-2">
              Sort by:
            </label>
            <select
              id="sort"
              onChange={(e) => handleSort(e.target.value as keyof CategoryData)}
              className="border rounded-lg p-1"
            >
              <option value="color">Color</option>
              <option value="type">Device Type</option>
              <option value="SN">Serial Number</option>
            </select>
          </div>
          <div>
            <label htmlFor="filter" className="mr-2">
              Filter:
            </label>
            <select
              id="filter"
              onChange={(e) => handleFilter('color', e.target.value)}
              className="border rounded-lg p-1"
            >
              <option value="">All</option>
              <option value="Left Hearing Aid">Left Hearing Aid</option>
              <option value="Right Hearing Aid">Right Hearing Aid</option>
              <option value="Remote">Remote</option>
              <option value="Charger">Charger</option>
            </select>
          </div>
        </div>
        <div className="flex justify-center flex-grow">
          <div>
            {/* <label htmlFor="model" className="mr-2">Model:</label> */}
            <select
              id="model"
              onChange={(e) => handleModelChange(e.target.value)}
              // className="border rounded-lg p-1"
              className="font-bold text-xl rounded-lg p-1"
            >
              <option value="Oticon">Oticon</option>
              <option value="Unitron">Unitron</option>
              <option value="Signia">Signia</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end flex-grow">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-12 rounded">
            +
          </button>
        </div>
      </div>

      <div className="w-full h-10 my-5 px-5 bg-gray-200 flex items-center">
        <div className="text-l font-bold mr-20 w-1/6">Color</div>
        <div className="text-l font-bold mr-20 w-1/6">Device Type</div>
        <div className="text-l font-bold w-1/6">Serial Number</div>
      </div>
      <div>
        <Inventory data={devices} />
      </div>
    </div>
  );
}
