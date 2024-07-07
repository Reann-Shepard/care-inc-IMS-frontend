export const metadata = {
  title: 'Inventory',
};

import Inventory from '@/components/inventory/Inventory-ov_page'; // Importing the Inventory component
import { Suspense } from 'react'; // Importing the Suspense component from React for lazy loading

// Inventory Overview Page Component that renders the Inventory component inside a Suspense component
export default function InventoryOVPage() {
  // Render the Inventory component inside the Suspense component
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Inventory />;
    </Suspense>
  );
}
