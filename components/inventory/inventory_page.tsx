'use client';

export interface CategoryData {
  color: string;
  type: string;
  SN: string;
  model: string;
  package: string;
}

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import tempData from './temp_invData.json';
import Table from '../table/ListTable';
import Link from 'next/link';
import { set } from 'zod';
import React from 'react';
const dataSet: CategoryData[] = tempData;
const ADataSet: CategoryData[] = tempData.filter(
  (device) => device.package === '1',
);
const UADataSet: CategoryData[] = tempData.filter(
  (device) => device.package === '0',
);

export default function Inventory() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedModel = searchParams.get('model') || 'All';

  // const [devices, setDevices] = useState<CategoryData[]>(dataSet);
  const [Adevices, setAdevices] = useState<CategoryData[]>(ADataSet);
  const [UAdevices, setUAdevices] = useState<CategoryData[]>(UADataSet);
  const [devices, setDevices] = useState<CategoryData[]>([
    ...UAdevices,
    ...Adevices,
  ]);
  const uniqueModels = Array.from(
    new Set([...dataSet.map((device) => device.model)]),
  );
  const [sort, setSort] = useState<keyof CategoryData | ''>();

  // Sorting Function
  const handleSort = (sortBy: keyof CategoryData) => {
    const sortedADevices = devices
      .filter((device) => device.package === '1')
      .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
    const sortedUADevices = devices
      .filter((device) => device.package === '0')
      .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
    setDevices([...sortedUADevices, ...sortedADevices]);
  };

  // Filtering Function
  // const handleFilter = (filterBy: keyof CategoryData, filterValue: string) => {
  //   const filteredDevices = devices.filter(
  //     (device) => device[filterBy] === filterValue,
  //   );
  //   setDevices(filteredDevices);
  // };

  // Handle Model Change
  const handleModelChange = (newModel: string) => {
    if (newModel === 'All') {
      setDevices([...UADataSet, ...ADataSet]);
    } else {
      const newADevices = ADataSet.filter(
        (device) => device.model === newModel,
      );
      const newUADevices = UADataSet.filter(
        (device) => device.model === newModel,
      );
      setDevices([...newUADevices, ...newADevices]);
    }
  };

  useEffect(() => {
    handleModelChange(selectedModel);
    setSort('');
  }, [selectedModel]);

  useEffect(() => {
    if (sort) {
      handleSort(sort);
    }
  }, [sort]);

  const header = ['Color', 'Device Type', 'Serial Number', 'Package'];

  const data = devices.map((device) => [
    device.color,
    device.type,
    device.SN,
    device.package,
  ]);

  return (
    <>
      <div className="flex justify-between items-center mb-5 mx-5">
        <div className="flex space-x-4">
          <div>
            <label htmlFor="sort" className="mr-2">
              Sort by:
            </label>
            <select
              id="sort"
              onChange={(e) => setSort(e.target.value as keyof CategoryData)}
              className="border rounded-lg p-1"
              value={sort}
            >
              <option value="" disabled selected></option>
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
              onChange={(e) => router.push(`?model=${e.target.value}`)}
              className="border rounded-lg p-1"
              value={selectedModel}
            >
              <option value="All">All</option>
              {uniqueModels.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>
        </div>
        {selectedModel !== 'All' && (
          <div className="font-bold text-xl ">{selectedModel}</div>
        )}
        <div className="w-96 flex justify-end">
          <Link href="/inventory/add_inventory">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-12 rounded">
              +
            </button>
          </Link>
        </div>
      </div>

      <div>
        <Table header={header} data={data} />
      </div>
    </>
  );
}
