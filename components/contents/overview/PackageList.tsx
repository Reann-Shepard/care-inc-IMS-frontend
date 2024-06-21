'use client';

import Card from '@/components/cards/Card';
import { Package } from '@/entities/overviewTypes';
import { getPackgeCountByMfr } from '@/services/overview/getPackage';
import { useEffect, useState } from 'react';

export default function PackageList() {
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    getPackgeCountByMfr().then((data) => {
      setPackages(data);
    });
  });

  return (
    <div>
      <Card
        title="Package"
        data={packages.map((pkg) => ({
          name: pkg.name,
          count: pkg.count,
        }))}
      />
    </div>
  );
}
