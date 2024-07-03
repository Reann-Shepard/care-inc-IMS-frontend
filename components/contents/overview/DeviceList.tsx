'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/cards/Card';
import { OverviewDevice } from '@/entities/overview-types';
import { getDeviceCountByName } from '@/services/overview/getOverviewDevice';

export default function DeviceList() {
  const [devices, setDevices] = useState<OverviewDevice[]>([]);

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
