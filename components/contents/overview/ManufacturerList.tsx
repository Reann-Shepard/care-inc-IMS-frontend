'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/cards/Card';
import { OverviewManufacturer } from '@/entities/overviewTypes';
import { getAllManufacturers } from '@/services/overview/getOverviewManufacturer';

export default function ManufacturerList() {
  const [manufacturers, setManufacturers] = useState<OverviewManufacturer[]>(
    [],
  );

  useEffect(() => {
    getAllManufacturers().then((data) => {
      setManufacturers(data);
    });
  }, []);

  return (
    <div>
      <Card
        title="Manufacturers"
        data={manufacturers.map((manufacturer) => ({
          name: manufacturer.name,
        }))}
      />
    </div>
  );
}
