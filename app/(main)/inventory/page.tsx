export const metadata = {
  title: 'Inventory',
};

import Inventory from '@/components/inventory/Inventory-ov_page';
import { Suspense } from 'react';

export default function InventoryOVPage() {
  return;
  <Suspense>
    <Inventory />;
  </Suspense>;
}
