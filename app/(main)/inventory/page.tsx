import Inventory from '@/component/Inventory/inventory_list';
import { useState } from 'react';

export const metadata = {
  title: 'Inventory',
};

interface CategoryData {
  color: string;
  type: string;
  SN: string;
}

export default function InventoryPage() {
  return (
    <div>
      <InventoryHeader />
    </div>
  );
}
