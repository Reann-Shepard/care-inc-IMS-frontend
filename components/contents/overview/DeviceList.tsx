'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/cards/Card';
import { Device } from '@/entities/overviewTypes';
import { getDeviceCountByName } from '@/services/overview/getDevice';

export default function DeviceList() {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    getDeviceCountByName().then((data) => {
      setDevices(data);
    });
  }, []);

  return (
    <div>
      <Card
        title="Device"
        data={devices.map((device) => ({
          name: device.name,
          count: device.count,
        }))}
      />
    </div>
  );
}
