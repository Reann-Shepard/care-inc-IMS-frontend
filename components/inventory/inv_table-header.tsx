'use client';

export interface CategoryData {
  color: string;
  type: string;
  SN: string;
  model: string;
}

import { useState, useEffect, use } from 'react';
import tempData from './temp_data.json';
import Inventory from './inventory_list';
const dataSet: CategoryData[] = tempData;

export default function InventoryHeader() {
  const [selectedModel, setSelectedModel] = useState<string>('Oticon');
  const [devices, setDevices] = useState<CategoryData[]>(dataSet);

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
  const handleModelChange = (newModel: string) => {
    const newDevices = dataSet.filter((device) => device.model === newModel);
    setDevices([...newDevices]);
  };

  useEffect(() => {
    handleModelChange(selectedModel);
  }, [selectedModel]);

  return (
    <>
      <div className="flex justify-between items-center mb-10 mx-5">
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
              onChange={(e) => setSelectedModel(e.target.value as string)}
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

      <div>
        <Inventory data={devices} />
      </div>
    </>
  );
}
