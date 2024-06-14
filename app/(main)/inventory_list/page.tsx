import React from 'react';
import Inventory from '@/components/inventory/inventory_page';
import { Suspense } from 'react';

export const metadata = {
  title: 'Inventory',
};

export default function InventoryPage() {
  return (
    <div>
      <Suspense fallback={<>Loading...</>}>
        <Inventory />
      </Suspense>
    </div>
  );
}
