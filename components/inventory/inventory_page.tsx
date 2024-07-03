'use client';

import { useState, useEffect, use } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import tempData from './temp_invData.json';
import Table from '@/components/tables/ListTable';
import Link from 'next/link';
import React from 'react';
import { getAllDevices } from '@/services/device/getDevice';
import { deviceToInv } from './deviceToInv';

export interface InvData {
  color: string;
  type: string;
  SN: string;
  model: string;
  package: string;
}

export default function Inventory() {
  const [devices, setDevices] = useState<InvData[]>([]);
  const [dataSet, setDataSet] = useState<InvData[]>([]);
  const [sort, setSort] = useState<keyof InvData | ''>();

  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedModel = searchParams.get('model') || 'All';

  // useEffect(() => {
  //   getAllDevices().then(async (data) => {
  //     setDataSet(await deviceToInv(data));
  //     setDevices(await deviceToInv(data));
  //   });
  // }, []);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const data = await getAllDevices();
        const transformedData = await deviceToInv(data);
        setDataSet(transformedData);
        setDevices(transformedData);
      } catch (error) {
        console.error('Error fetching devices', error);
      }
    };

    fetchDevices();
  }, []);

  // const uniqueModels = Array.from(
  //   new Set([...dataSet.map((device) => device.model)]),
  // );
  const uniqueModels = Array.from(
    new Set(dataSet.map((device) => device.model)),
  );

  // Sorting Function
  // const handleSort = (sortBy: keyof InvData) => {
  //   const sortedDevices = devices.sort((a, b) =>
  //     a[sortBy].localeCompare(b[sortBy]),
  //   );
  //   setDevices([...sortedDevices]);
  // };
  const handleSort = (sortBy: keyof InvData) => {
    const sortedDevices = [...devices].sort((a, b) =>
      a[sortBy].localeCompare(b[sortBy]),
    );
    setDevices(sortedDevices);
  };

  // Handle Model Change
  const handleModelChange = (newModel: string) => {
    if (newModel === 'All') {
      setDevices([...dataSet]);
    }
    // else {
    //   const newDevices = dataSet.filter((device) => device.model === newModel);
    //   setDevices([...newDevices]);
    // }
    else {
      const filteredDevices = dataSet.filter(
        (device) => device.model === newModel,
      );
      setDevices(filteredDevices);
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

  // if (selectedModel === 'All') {
  //   var header = ['Model', 'Color', 'Device Type', 'Serial Number', 'Package'];
  //   var ASS = devices
  //     .filter((device) => device.package === 'Yes')
  //     .map((device) => [
  //       device.model,
  //       device.color,
  //       device.type,
  //       device.SN,
  //       device.package,
  //     ]);
  //   var UASS = devices
  //     .filter((device) => device.package === '')
  //     .map((device) => [
  //       device.model,
  //       device.color,
  //       device.type,
  //       device.SN,
  //       device.package,
  //     ]);
  // } else {
  //   var header = ['Color', 'Device Type', 'Serial Number', 'Package'];
  //   var ASS = devices
  //     .filter((device) => device.package === 'Yes')
  //     .map((device) => [device.color, device.type, device.SN, device.package]);
  //   var UASS = devices
  //     .filter((device) => device.package === '')
  //     .map((device) => [device.color, device.type, device.SN, device.package]);
  // }

  const headers =
    selectedModel === 'All'
      ? ['Model', 'Color', 'Device Type', 'Serial Number', 'Package']
      : ['Color', 'Device Type', 'Serial Number', 'Package'];

  const ASS = devices
    .filter((device) => device.package === 'Yes')
    .map((device) =>
      selectedModel === 'All'
        ? [device.model, device.color, device.type, device.SN, device.package]
        : [device.color, device.type, device.SN, device.package],
    );

  const UASS = devices
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
              <option value="" disabled selected></option>
              <option value="model">Model</option>
              <option value="color">Color</option>
              <option value="type">Device Type</option>
              <option value="SN">Serial Number</option>
            </select>
          </div>
          <div>
            <label htmlFor="filter" className="mr-2">
              {' '}
              Filter:{' '}
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
          <Link href="/inventory/add_inventory">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-12 rounded">
              +
            </button>
          </Link>
        </div>
      </div>

      <div>
        <Table header={headers} data={[...UASS, ...ASS]} />
      </div>
    </>
  );
}
