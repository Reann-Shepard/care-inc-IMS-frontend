import AddInventoryForm from '@/components/forms/AddInventoryForm'; // Importing the AddInventoryForm component

export const metadata = {
  // Metadata for the page title
  title: 'Add Inventory',
};

// Add Inventory Page Component that renders the AddInventoryForm component
export default function AddInventoryPage() {
  return (
    <div>
      <div className="w-full h-10 my-5 bg-gray-200 font-bold flex justify-center items-center">
        Add New Device
      </div>
      <div className="mt-20 flex justify-center">
        <AddInventoryForm />
      </div>
    </div>
  );
}
