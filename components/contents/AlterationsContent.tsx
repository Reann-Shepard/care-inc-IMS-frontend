'use client';
import AddBtn from '../buttons/AddBtn';
import ListTable from '../tables/ListTable';
import { useState, useEffect } from 'react';
import { getAllRepairs } from '@/services/repair/getRepair';
import dayjs from 'dayjs';

interface AlterationData {
  clientId: string;
  manufacturerId: string;
  reason: string;
  shipDate: Date;
  receivedDate: Date;
}

export default function AlterationsContent() {
  const [repairData, setRepairData] = useState<AlterationData[]>([]);

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
    };

    fetchAlterations();
  }, []);

  const data = repairData.map((repair) => [
    repair.clientId,
    repair.manufacturerId,
    repair.reason,
    dayjs(repair.shipDate).format('MM-DD-YYYY'),
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
