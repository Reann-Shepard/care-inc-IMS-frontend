'use client';

import Card from '@/components/cards/Card';
import { OverviewPackage } from '@/entities/overviewTypes';
import { getPackgeCountByMfr } from '@/services/overview/getPOverviewPackage';

import { useEffect, useState } from 'react';

export default function PackageList() {
  const [packages, setPackages] = useState<OverviewPackage[]>([]);

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
