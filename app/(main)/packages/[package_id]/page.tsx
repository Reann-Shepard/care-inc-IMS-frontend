'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ListTable from '@/components/tables/ListTable';

import { getAllDevices } from '@/services/device/getDevice';
import { Device } from '@/entities/Device';
import { getThisColorName } from '@/services/color/getColor';
import { set } from 'zod';
import { getThisTypeName } from '@/services/type/getType';
import { getThisManufacturerName } from '@/services/overview/getManufacturer';
import Link from 'next/link';
import BackBtn from '@/components/buttons/BackBtn';

export default function PackageId() {
  const searchParams = useSearchParams();
  const selectedId = searchParams.get('package_id') ?? '';
  const [devices, setDevices] = useState<Device[]>([]);
  const [data, setData] = useState<(string | number | Date | null)[][]>([]);
  const [currentLocation, setCurrentLocation] = useState<string>('');

  const dataTitle = [
    'Device ID',
    'Serial Number',
    'Manufacturer',
    'Color',
    'Type',
    'Stock in Date',
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
    fetchDevices();
  }, []);

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

  useEffect(() => {
    const current = `Package ID: ${selectedId}`;
    setCurrentLocation(current);
    const fetchData = async () => {
      const thisPackageData = devices.filter(
        (device) => device.packageId === parseInt(selectedId),
      );
      const data = thisPackageData.map(async (thisDevice) => [
        thisDevice.id,
        thisDevice.serialNumber,
        await getThisManufacturerName(thisDevice.manufacturerId),
        await getThisColorName(thisDevice.colorId),
        await getThisTypeName(thisDevice.typeId),
        toDate(thisDevice.stockInDate),
        toDate(thisDevice.sellDate ?? ''),
        thisDevice.packageId ?? '',
      ]);
      const resolvedData = await Promise.all(data);
      setData(resolvedData);
    };
    fetchData().then((data) => {
      console.log(data);
    });
  }, [devices, selectedId]);

  return (
    <div>
      <BackBtn
        backToLocation="Packages"
        currentLocation={currentLocation}
        pathName="/packages"
      />
      <ListTable header={dataTitle} data={data} />
    </div>
  );
}
