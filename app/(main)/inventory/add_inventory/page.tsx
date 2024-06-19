import AddInventoryForm from '@/components/forms/AddInventoryForm';


export const metadata = {
  title: 'Add Inventory',
};

export default function AddInventoryPage() {
  return (
    <div>
      <div className="w-full h-10 my-5 bg-gray-200 font-bold flex justify-center items-center">
        Add new item
      </div>
      <div className="mt-20 flex justify-center">
        <AddInventoryForm />
      </div>
    </div>
  );
}
