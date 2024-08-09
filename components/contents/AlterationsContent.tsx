'use client';
import AddBtn from '../buttons/AddBtn';
import ListTable from '../tables/ListTable';
import { useState, useEffect } from 'react';
import { getAllRepairs } from '@/services/repair/getRepair';
import dayjs from 'dayjs';
import { Manufacturer } from '@/entities/manufacturer';
import { getAllManufacturers } from '@/services/overview/getOverviewManufacturer';

interface AlterationData {
  clientId: string;
  manufacturerId: string;
  reason: string;
  shippingDate: Date;
  receivedDate: Date;
}

export default function AlterationsContent() {
  const [repairData, setRepairData] = useState<AlterationData[]>([]);
  const [manufacturerData, setManufacturerData] = useState<Manufacturer[]>([]);

  const header = [
    'Client ID',
    'Manufacturer',
    'Reason',
    'Ship Date',
    'Received Date',
  ];

  useEffect(() => {
    const fetchAlterations = async () => {
      try {
        const repairs = await getAllRepairs();
        setRepairData(repairs);
      } catch (error) {
        console.error('Error fetching alterations', error);
      }
      try {
        const manufacturers = await getAllManufacturers();
        setManufacturerData(manufacturers);
      } catch (error) {
        console.error('Error fetching manufacturer', error);
      }
    };

    fetchAlterations();
  }, []);

  const data = repairData.map((repair) => [
    repair.clientId,
    manufacturerData.find(
      (manufacturer) => manufacturer.id === Number(repair.manufacturerId),
    )?.name || '',
    repair.reason,
    repair.shippingDate ? dayjs(repair.shippingDate).format('MM-DD-YYYY') : '',
    repair.receivedDate ? dayjs(repair.receivedDate).format('MM-DD-YYYY') : '',
  ]);
  return (
    <main>
      <div className="flex m-5 justify-end">
        <AddBtn pathName="/alterations/add-alteration" element="Alteration" />
      </div>
      <div className="overflow-x-auto">
        <ListTable
          header={header}
          data={data as (string | number | Date | null)[][]}
        />
      </div>
    </main>
  );
}
