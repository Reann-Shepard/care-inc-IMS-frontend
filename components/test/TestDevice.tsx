'use client';

import { useEffect, useState } from 'react';

// @TODO: Interface of type will be saved in a separate folder
interface Device {
  id: number;
  serialNumber: string;
  manufacturerId?: number;
  colorId?: number;
  stockDate: Date;
  sellDate?: Date;
}

// @TODO: Basic fetch function will be saved in a separate folder
const getDevices = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  console.log('API URL:', apiUrl);

  if (!apiUrl) {
    throw new Error('API URL is not defined');
  }

  try {
    const response = await fetch(`${apiUrl}/device`);
    if (!response.ok) {
      throw new Error('Failed to fetch devices');
    }
    const devices = await response.json();
    return devices;
  } catch (err) {
    console.error('Error fetching data', err);
    return [] as Device[];
  }
};

export default function TestDevice() {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const loadedDevices = await getDevices();
      setDevices(loadedDevices);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Test Device</h1>
      <ul>
        {devices.map((device) => (
          <li key={device.id}>
            Device ID: {device.id} - Serial Number: {device.serialNumber}
          </li>
        ))}
      </ul>
    </div>
  );
}
