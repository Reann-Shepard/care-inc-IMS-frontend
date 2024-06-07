'use client';

import { useEffect, useState } from 'react';
import { getAllManufacturers } from '../../../services/manufacturer/getManufacturer';
import Card from '@/components/cards/Card';
import { Manufacturer } from '@/entities/Manufacturer';

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
