import InventoryList from '@/components/inventory/inventory_page';

export const metadata = {
  title: 'Inventory',
};

export default function InventoryPage() {
  return (
    <div>
      <InventoryList />
    </div>
  );
}
