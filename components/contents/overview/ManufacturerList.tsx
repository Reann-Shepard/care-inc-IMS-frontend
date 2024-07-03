'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/cards/Card';
import { getAllManufacturers } from '@/services/overview/getOverviewManufacturer';
import { Manufacturer } from '@/entities/manufacturer';

export default function ManufacturerList() {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);

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
