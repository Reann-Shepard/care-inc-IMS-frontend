'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import { getAllDevices } from '@/services/device/getDevice';
import { Device } from '@/entities/Device';
import { getThisColorName } from '@/services/color/getColor';
import { getThisTypeName } from '@/services/type/getType';
import { getThisManufacturerName } from '@/services/overview/getOverviewManufacturer';
import BackBtn from '@/components/buttons/BackBtn';
import DetailsContent from '@/components/contents/package/DetailsContent';
import AddClientInfoForm from '@/components/forms/package/AddClientInfoForm';
import { getPackageById } from '@/services/package/getPackage';
import { set } from 'zod';
import { Package } from '@/entities/Package';
import FormBar from '@/components/forms/FormBar';
import SubAddBtn from '@/components/buttons/package/SubAddBtn';
import { toDate } from '@/components/contents/package/toDate';

export default function PackageId() {
  const searchParams = useSearchParams();
  const selectedId = searchParams.get('package_id') ?? '';
  const [devices, setDevices] = useState<Device[]>([]);
  const [deviceData, setDeviceData] = useState<
    (string | number | Date | null)[][]
  >([]);
  const [packages, setPackages] = useState<Package[]>([]);
  const [packageData, setPackageData] = useState<
    (string | number | Date | null)[][]
  >([]);
  const [currentLocation, setCurrentLocation] = useState<string>('');
  const [hasClient, setHasClient] = useState<boolean>(false);
  const [addClientSection, setAddClientSection] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const deviceTitle = [
    'Device ID',
    'Serial Number',
    'Manufacturer',
    'Color',
    'Type',
    'Stock in Date',
    'Sell Date',
    'Package ID',
  ];

  const packageTitle = [
    'Package ID',
    'Client ID',
    'Fitting Date',
    'Warranty Date',
    'Comment',
  ];

  useEffect(() => {
    const fetchDevices = async () => {
      getAllDevices().then((data) => {
        setDevices(data);
      });

      getPackageById(parseInt(selectedId)).then((data) => {
        setPackages([data]);
      });

      setLoading(false);
    };
    fetchDevices();
  }, []);

  // const toDate = (date: string | Date | undefined): string => {
  //   if (!date) return '';
  //   if (typeof date === 'string') {
  //     return date.split('T')[0];
  //   } else if (date instanceof Date) {
  //     return date.toISOString().split('T')[0];
  //   } else {
  //     throw new Error('Invalid date format.');
  //   }
  // };

  useEffect(() => {
    const current = `Package ID: ${selectedId}`;
    setCurrentLocation(current);
    const fetchData = async () => {
      // package
      const packageDataResult = packages.map((thisPackage) => [
        thisPackage.id,
        thisPackage.clientId ? thisPackage.clientId : 'N/A',
        thisPackage.fittingDate
          ? toDate(thisPackage.fittingDate.toString())
          : 'N/A',
        thisPackage.warrantyExpiration
          ? toDate(thisPackage.warrantyExpiration.toString())
          : 'N/A',
        thisPackage.comments,
      ]) as (string | number | Date | null)[][];

      console.log('packageDataResult: ', packageDataResult);
      setPackageData(packageDataResult);

      // devices
      const thisPackageDevices = devices.filter(
        (device) => device.packageId === parseInt(selectedId),
      );
      const data = thisPackageDevices.map(async (thisDevice) => [
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
      setDeviceData(resolvedData);
    };
    fetchData().then((data) => {
      console.log(data);
    });
  }, [devices, selectedId]);

  // check if the package has a client
  useEffect(() => {
    if (packages[0] !== undefined) {
      if (packages[0].clientId === undefined || packages[0].clientId === null) {
        setHasClient(false);
      } else {
        setHasClient(true);
        setAddClientSection(false);
      }
    }
  }, [packages]);

  const handleClick = () => {
    setAddClientSection(true);
  };

  return (
    <div>
      <div className="flex justify-between mx-5">
        <BackBtn
          backToLocation="Packages"
          currentLocation={currentLocation}
          pathName="/packages"
        />
        {hasClient || addClientSection ? (
          <SubAddBtn btnName="Add Client" disabled />
        ) : (
          <SubAddBtn btnName="Add Client" handleClick={handleClick} />
        )}
      </div>

      {addClientSection ? (
        <div>
          <FormBar title="Assign Client to the Package" />
          <AddClientInfoForm packageId={parseInt(selectedId)} />
        </div>
      ) : (
        // <Suspense fallback={<div>Loading...</div>}>
        <div>
          <DetailsContent
            header={packageTitle}
            data={packageData}
            title="Package Information"
          />
          {loading && (
            <div className="text-lg flex justify-center">Loading...</div>
          )}
          <div className="h-16"></div>
          <DetailsContent
            header={deviceTitle}
            data={deviceData}
            title="Device Information"
          />
          {loading && (
            <div className="text-lg flex justify-center">Loading...</div>
          )}
        </div>
        // {/* </Suspense> */}
      )}
    </div>
  );
}
