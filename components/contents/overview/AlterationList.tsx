'use client';

import Card from '@/components/cards/Card';
import { OverviewAlteration } from '@/entities/overview-types';
import { getAlterationByMfr } from '@/services/overview/getOverviewAlteration';
import { useEffect, useState } from 'react';

export default function AlterationList() {
  const [alterations, setAlterations] = useState<OverviewAlteration[]>([]);

  useEffect(() => {
    getAlterationByMfr().then((data) => {
      setAlterations(data);
    });
  }, []);

  return (
    <div>
      <Card
        title="Alteration"
        data={alterations.map((alteration) => ({
          name: alteration.name,
          count: alteration.count,
        }))}
      />
    </div>
  );
}
