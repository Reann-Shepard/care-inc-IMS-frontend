import Inventory from '@/components/inventory/Inventory_ov';

interface CategoryData {
  name: string;
  model: string;
  quantity: number;
}

export default function InventoryOVPage() {
  const devices: CategoryData[] = [
    {
      name: 'Oticon',
      model: 'Real 2',
      quantity: 5,
    },

    {
      name: 'Unitron',
      model: 'V-RS 7',
      quantity: 11,
    },

    {
      name: 'Unitron',
      model: 'V-R 7',
      quantity: 1,
    },

    {
      name: 'Signia',
      model: '5IX',
      quantity: 2,
    },
  ];

  return (
    <div>
      <div className="flex justify-end mb-2 mr-10">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-12 rounded">
          +
        </button>
      </div>
      <div className="w-full h-10 my-5 px-5 bg-gray-200 flex items-center">
        <div className="text-l font-bold mr-20 w-1/6">Company</div>
        <div className="text-l font-bold mr-20 w-1/6">Model</div>
        <div className="text-l font-bold w-1/6">Amount</div>
      </div>
      <div>
        <Inventory data={devices} />
      </div>
    </div>
  );
}
