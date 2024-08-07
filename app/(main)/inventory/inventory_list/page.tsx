import React from 'react';
import Inventory from '@/components/inventory/InventoryPage';
import { Suspense } from 'react';

// Inventory Page Component that renders the Inventory component inside a Suspense component
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
