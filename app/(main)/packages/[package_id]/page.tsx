'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ListTable from '@/components/tables/ListTable';

import { getAllDevices } from '@/services/device/getDevice';
import { Device } from '@/entities/Device';

export default function PackageId() {
  const searchParams = useSearchParams();
  const selectedId = searchParams.get('package_id') ?? '';
  const [devices, setDevices] = useState<Device[]>([]);

  const dataTitle = [
    'Device ID',
    'Serial Number',
    'Manufacturer ID',
    'Color ID',
    'Type ID',
    'Stock Date',
    'Sell Date',
    'Package ID',
  ];

  useEffect(() => {
    const fetchDevices = async () => {
      getAllDevices().then((data) => {
        setDevices(data);
      });
      // console.log(devices);
    };
    try {
      fetchDevices();
    } catch (error) {
      console.error(error);
    }
  }, [devices]);

  const toDate = (date: string | Date | undefined): string => {
    if (!date) return '';
    if (typeof date === 'string') {
      return date.split('T')[0];
    } else if (date instanceof Date) {
      return date.toISOString().split('T')[0];
    } else {
      throw new Error('Invalid date format.');
    }
  };

  const thisPackageData = devices.filter(
    (device) => device.packageId === parseInt(selectedId),
  );
  const data = thisPackageData.map((thisDevice) => [
    thisDevice.id,
    thisDevice.serialNumber,
    thisDevice.manufacturerId,
    thisDevice.colorId,
    thisDevice.typeId,
    toDate(thisDevice.stockDate),
    toDate(thisDevice.sellDate ?? ''),
    thisDevice.packageId ?? '',
  ]);

  return (
    <div>
      <ListTable header={dataTitle} data={data} />
    </div>
  );
}
