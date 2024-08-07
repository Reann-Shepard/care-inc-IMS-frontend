/**
 * Inventory Management Page Component.
 *
 * This component manages and displays inventory data based on selected models.
 * It allows sorting and filtering of inventory items, and provides a link to add new inventory items.
 */

'use client';

import Table from '@/components/tables/ListTable';
import Link from 'next/link';
import React, { useState, useEffect, use } from 'react';
import { getAllDevices } from '@/services/device/getDevice';
import { useSearchParams, useRouter } from 'next/navigation';
import { deviceToInv } from '@/services/device/deviceToInv';

// Interface for inventory data
export interface InvData {
  color: string;
  type: string;
  SN: string;
  model: string;
  package: string;
}

export default function Inventory() {
  const [devices, setDevices] = useState<InvData[]>([]); // State for holding filtered devices
  const [dataSet, setDataSet] = useState<InvData[]>([]); // State for holding all devices
  const [sort, setSort] = useState<keyof InvData | ''>(); // State for sorting key
  const [selectedModel, setSelectedModel] = useState<string>('All'); // State for selected model

  const router = useRouter();
  const searchParams = useSearchParams();
  const modelParam = searchParams.get('model'); // Get selected model from url search params

  useEffect(() => {
    // Fetch all devices and transform data to inventory format
    const fetchDevices = async () => {
      try {
        const data = await getAllDevices();
        const transformedData = await deviceToInv(data); // Transform device data to inventory format
        setDataSet(transformedData); // Set all devices
        setDevices([...transformedData]); // Set filtered devices
        setSelectedModel(modelParam || 'All'); // Set selected model from url search params
      } catch (error) {
        console.error('Error fetching devices', error); // Log error if fetching devices fails
      }
    };

    fetchDevices(); // Fetch devices when the component mounts
  }, [modelParam]); // Fetch devices when modelParam changes

  // Get unique models from the dataset
  const uniqueModels = Array.from(
    new Set(dataSet.map((device) => device.model)),
  );

  // Sorting Function
  const handleSort = (sortBy: keyof InvData) => {
    // Handle sorting based on the selected key
    const sortedDevices = devices.sort((a, b) =>
      a[sortBy].localeCompare(b[sortBy]),
    );
    setDevices([...sortedDevices]); // Set sorted devices in state
  };

  // Handle Model Change
  const handleModelChange = (newModel: string) => {
    setSelectedModel(newModel); // Set selected model
    router.push(`?model=${newModel}`); // Push new model to url
  };

  useEffect(() => {
    if (selectedModel === 'All') {
      setDevices([...dataSet]);
    } else {
      const filteredDevices = dataSet.filter(
        (device) => device.model === selectedModel, // Filter devices based on selected model
      );
      setDevices(filteredDevices);
    }
    setSort(''); // Reset sorting when model changes
  }, [selectedModel, dataSet]); // Update devices when selected model or dataset changes

  useEffect(() => {
    if (sort) {
      handleSort(sort); // Handle sorting when sort key changes
    }
  }, [sort]); // Update devices when sort key changes

  // Table Headers and Data
  const headers =
    selectedModel === 'All'
      ? ['Model', 'Color', 'Device Type', 'Serial Number', 'Package'] // Table headers for all models
      : ['Color', 'Device Type', 'Serial Number', 'Package']; // Table headers for selected model

  // Filter devices based on package status
  const asg = devices
    .filter((device) => device.package === '🟢')
    .map((device) =>
      selectedModel === 'All'
        ? [device.model, device.color, device.type, device.SN, device.package]
        : [device.color, device.type, device.SN, device.package],
    );

  const uasg = devices
    .filter((device) => device.package === '')
    .map((device) =>
      selectedModel === 'All'
        ? [device.model, device.color, device.type, device.SN, device.package]
        : [device.color, device.type, device.SN, device.package],
    );

  return (
    <>
      <div className="flex justify-between items-center mb-5 mx-5">
        <div className="flex space-x-4">
          <div>
            <label htmlFor="sort" className="mr-2">
              {' '}
              Sort by:{' '}
            </label>
            <select
              id="sort"
              onChange={(e) => setSort(e.target.value as keyof InvData)}
              className="border rounded-lg p-1"
              value={sort}
            >
              <option value="" disabled selected>
                Select
              </option>
              {/* <option value="model">Model</option> */}
              <option value="color">Color</option>
              <option value="type">Device Type</option>
            </select>
          </div>
          <div>
            <label htmlFor="filter" className="mr-2">
              {' '}
              Filter by Model:{' '}
            </label>
            <select
              id="filter"
              onChange={(e) => handleModelChange(e.target.value)}
              className="border rounded-lg p-1"
              value={selectedModel}
            >
              <option value="All">All</option>
              {uniqueModels.map((model) => (
                <option key={model} value={model}>
                  {' '}
                  {model}{' '}
                </option>
              ))}
            </select>
          </div>
        </div>
        {selectedModel !== 'All' && (
          <div className="font-bold text-xl ">{selectedModel}</div>
        )}

        <div className="w-96 flex justify-end">
          <Link
            href="/inventory/add_inventory"
            className="btn px-10 font-bold text-white bg-[#54CE50]"
          >
            +
          </Link>
        </div>
      </div>

      <div>
        <Table header={headers} data={[...uasg, ...asg]} />
      </div>
    </>
  );
}
